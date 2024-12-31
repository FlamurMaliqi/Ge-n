package gendev.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import gendev.entity.GameInfo;
import gendev.entity.StreamingPackageCoverage;
import gendev.entity.StreamingPackageCoverageDTO;
import gendev.entity.Tournament;
import gendev.repositories.GameRepository;
import gendev.repositories.StreamingPackageCoverageRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class StreamingService {

    @Inject
    GameRepository gameRepository;

    @Inject
    EntityManager entityManager;

    @Inject
    StreamingPackageCoverageRepository repository;

    // Method to fetch all team names
    public List<String> getAllTeamNames() {
        return gameRepository.findAllTeamNames();
    }

    // Method to get the information about streaming packages and format it into DTOs
    public List<List<StreamingPackageCoverageDTO>> getPackageInformation(List<String> teams) {
        // Execute the query to get package information and store the results
        List<List<StreamingPackageCoverage>> combinations =  executeAndStoreQuery(teams);

        List<List<StreamingPackageCoverageDTO>> result = new ArrayList<>();

        // Loop through each combination of packages
        for (List<StreamingPackageCoverage> combination : combinations) {
            List<StreamingPackageCoverageDTO> dtoList = new ArrayList<>();

            // Convert each package into a DTO (Data Transfer Object)
            for (StreamingPackageCoverage packageCoverage : combination) {
                // Group the games of the package by tournaments
                Map<String, List<GameInfo>> tournamentsMap = groupGamesByTournament(packageCoverage.getCoveredGames(), packageCoverage.getPackageName());

                List<Tournament> tournaments = new ArrayList<>();
                // For each tournament, create a Tournament object and set its details
                for (Map.Entry<String, List<GameInfo>> entry : tournamentsMap.entrySet()) {
                    Tournament tournament = new Tournament();
                    tournament.setTournamentName(entry.getKey());
                    tournament.setGameInfos(entry.getValue());
                    tournaments.add(tournament);
                }

                // Create a DTO for the package
                StreamingPackageCoverageDTO dto = new StreamingPackageCoverageDTO();
                dto.setPackageName(packageCoverage.getPackageName());
                dto.setMonthlyPriceCents(packageCoverage.getMonthlyPriceCents());
                dto.setMonthlyPriceYearlySubscriptionInCents(packageCoverage.getMonthlyPriceYearlySubscriptionInCents());
                dto.setCoveredGames(tournaments);

                dtoList.add(dto);
            }

            result.add(dtoList);
        }

        return result;
    }

    // Method to group games of a package by tournament name
    private Map<String, List<GameInfo>> groupGamesByTournament(List<Long> gameIds, String packageName) {
        Map<String, List<GameInfo>> tournamentMap = new HashMap<>();

        // For each game, get its details and group them by tournament
        for (Long gameId : gameIds) {
            List<Object> gameDetails = getGameDetails(gameId, packageName); 
            String tournamentName = (String) gameDetails.get(0);
            String teamHome = (String) gameDetails.get(1);
            String teamAway = (String) gameDetails.get(2);
            boolean isLive = (boolean) gameDetails.get(3);
            boolean hasHighlights = (boolean) gameDetails.get(4);

            GameInfo gameInfo = new GameInfo(teamHome, teamAway, isLive, hasHighlights);

            // Add the game to the respective tournament
            tournamentMap.computeIfAbsent(tournamentName, k -> new ArrayList<>()).add(gameInfo);
        }

        return tournamentMap;
    }

    // Method to retrieve details of a specific game
    private List<Object> getGameDetails(Long gameId, String packageName) {
        String sql = """
                WITH package_id AS (
                    SELECT id
                    FROM bc_streaming_package
                    WHERE name = ?2
                ),
                game_details AS (
                    SELECT 
                        g.id AS game_id,
                        g.tournament_name,
                        g.team_home,
                        g.team_away,
                        s.live,
                        s.highlights
                    FROM 
                        bc_game g
                    LEFT JOIN 
                        bc_streaming_offer s ON g.id = s.game_id
                    JOIN 
                        package_id p ON s.streaming_package_id = p.id
                    WHERE 
                        g.id = ?1
                )
                SELECT 
                    tournament_name, 
                    team_home, 
                    team_away, 
                    live, 
                    highlights
                FROM 
                    game_details;
                """;
    
        try {
            @SuppressWarnings("unchecked")
            List<Object[]> queryResult = entityManager.createNativeQuery(sql)
                    .setParameter(1, gameId)
                    .setParameter(2, packageName)
                    .getResultList();
    
            // If the game details are found, return them
            if (!queryResult.isEmpty()) {
                Object[] resultRow = queryResult.get(0);
    
                // Map the result row to values and handle nulls
                String tournamentName = resultRow[0] != null ? (String) resultRow[0] : "Unknown Tournament";
                String teamHome = resultRow[1] != null ? (String) resultRow[1] : "Unknown Team";
                String teamAway = resultRow[2] != null ? (String) resultRow[2] : "Unknown Team";
                Boolean isLive = resultRow[3] != null ? (Boolean) resultRow[3] : false;
                Boolean hasHighlights = resultRow[4] != null ? (Boolean) resultRow[4] : false;
    
                return List.of(tournamentName, teamHome, teamAway, isLive, hasHighlights);
            } else {
                return List.of("Game not found", "Unknown Team", "Unknown Team", false, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return List.of("Error retrieving game details", "Unknown Team", "Unknown Team", false, false);
        }
    }
    
    // Method to execute and store the query results based on the teams
    public List<List<StreamingPackageCoverage>> executeAndStoreQuery(List<String> teams) {
        String sql = """
                    WITH team_games AS (
                        SELECT id AS game_id
                        FROM bc_game
                        WHERE team_home = ANY (?1) OR team_away = ANY (?1)
                    ),
                    package_coverage AS (
                        SELECT
                            so.streaming_package_id,
                            ARRAY_AGG(so.game_id) AS covered_games
                        FROM bc_streaming_offer so
                        WHERE so.game_id IN (SELECT game_id FROM team_games)
                        GROUP BY so.streaming_package_id
                    )
                    SELECT
                        pc.streaming_package_id,
                        sp.name AS package_name,
                        sp.monthly_price_cents,
                        sp.monthly_price_yearly_subscription_in_cents,
                        pc.covered_games
                    FROM package_coverage pc
                    JOIN bc_streaming_package sp ON pc.streaming_package_id = sp.id
                    ORDER BY pc.streaming_package_id;
                """;

        // Execute the query and get the results
        List<Object[]> queryResults = entityManager.createNativeQuery(sql)
                .setParameter(1, teams.toArray(new String[0]))
                .getResultList();

        List<StreamingPackageCoverage> coverageList = new ArrayList<>();
        for (Object[] row : queryResults) {
            StreamingPackageCoverage coverage = new StreamingPackageCoverage();
            coverage.setPackageName((String) row[1]);
            coverage.setMonthlyPriceCents((Integer) row[2]);
            coverage.setMonthlyPriceYearlySubscriptionInCents((Integer) row[3]);

            // Store the covered games as a Set (removing duplicates)
            Set<Long> coveredGames = new HashSet<>(Arrays.asList((Long[]) row[4]));
            coverage.setCoveredGames(new ArrayList<>(coveredGames));
            coverageList.add(coverage);
        }

        // Aggregate the required games from the package coverages
        Set<Long> requiredGames = new HashSet<>();
        for (StreamingPackageCoverage coverage : coverageList) {
            requiredGames.addAll(coverage.getCoveredGames());
        }

        // Find all package combinations that cover the required games
        List<List<StreamingPackageCoverage>> combinations = findPackageCombinations(coverageList, requiredGames);

        return combinations; 
    }

    // Method to find the combinations of packages that cover all required games
    private List<List<StreamingPackageCoverage>> findPackageCombinations(List<StreamingPackageCoverage> packageList,
            Set<Long> requiredGames) {
        List<List<StreamingPackageCoverage>> result = new ArrayList<>();
        List<StreamingPackageCoverage> currentCombination = new ArrayList<>();
        Set<Long> coveredGames = new HashSet<>();

        // Continue until all required games are covered
        while (!coveredGames.containsAll(requiredGames)) {
            StreamingPackageCoverage bestPackage = null;
            int maxCoverage = 0;

            // Find the package with the maximum coverage of uncovered games
            for (StreamingPackageCoverage currentPackage : packageList) {
                int coverageCount = getCoverageCount(currentPackage, coveredGames);
                if (coverageCount > maxCoverage) {
                    maxCoverage = coverageCount;
                    bestPackage = currentPackage;
                }
            }

            if (bestPackage == null)
                break;

            // Add the best package to the combination
            currentCombination.add(bestPackage);
            coveredGames.addAll(bestPackage.getCoveredGames());
        }

        // If a valid combination of packages was found, add it to the result
        if (!currentCombination.isEmpty()) {
            result.add(currentCombination);
        }

        return result;
    }

    // Method to calculate the number of uncovered games covered by a package
    private int getCoverageCount(StreamingPackageCoverage currentPackage, Set<Long> coveredGames) {
        Set<Long> uncoveredGames = new HashSet<>(currentPackage.getCoveredGames());
        uncoveredGames.removeAll(coveredGames);
        return uncoveredGames.size();
    }
}
