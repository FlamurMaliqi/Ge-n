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

    // Methode zum Abrufen aller Teamnamen
    public List<String> getAllTeamNames() {
        return gameRepository.findAllTeamNames();
    }

    public List<List<StreamingPackageCoverageDTO>> getPackageInformation(List<String> teams) {
        List<List<StreamingPackageCoverage>> combinations =  executeAndStoreQuery(teams);

        List<List<StreamingPackageCoverageDTO>> result = new ArrayList<>();

        for (List<StreamingPackageCoverage> combination : combinations) {
            List<StreamingPackageCoverageDTO> dtoList = new ArrayList<>();

            for (StreamingPackageCoverage packageCoverage : combination) {
                // Mapping von Spiel-IDs zu Turnieren (Beispiel: Daten anpassen)
                Map<String, List<GameInfo>> tournamentsMap = groupGamesByTournament(packageCoverage.getCoveredGames(), packageCoverage.getPackageName());

                // Erstelle eine Liste von Turnieren
                List<Tournament> tournaments = new ArrayList<>();
                for (Map.Entry<String, List<GameInfo>> entry : tournamentsMap.entrySet()) {
                    Tournament tournament = new Tournament();
                    tournament.setTournamentName(entry.getKey());
                    tournament.setGameInfos(entry.getValue());
                    tournaments.add(tournament);
                }

                // Erstelle StreamingPackageCoverageDTO
                StreamingPackageCoverageDTO dto = new StreamingPackageCoverageDTO();
                dto.setPackageName(packageCoverage.getPackageName());
                dto.setMonthlyPriceCents(packageCoverage.getMonthlyPriceCents());
                dto.setMonthlyPriceYearlySubscriptionInCents(
                        packageCoverage.getMonthlyPriceYearlySubscriptionInCents());
                dto.setCoveredGames(tournaments);

                dtoList.add(dto);
            }

            result.add(dtoList);
        }

        return result;
    }

    private Map<String, List<GameInfo>> groupGamesByTournament(List<Long> gameIds, String packageName) {
        Map<String, List<GameInfo>> tournamentMap = new HashMap<>();

        for (Long gameId : gameIds) {
            List<Object> gameDetails = getGameDetails(gameId, packageName); 
            String tournamentName = (String) gameDetails.get(0);
            String teamHome = (String) gameDetails.get(1);
            String teamAway = (String) gameDetails.get(2);
            boolean isLive = (boolean) gameDetails.get(3);
            boolean hasHighlights = (boolean) gameDetails.get(4);

            GameInfo gameInfo = new GameInfo(teamHome, teamAway, isLive, hasHighlights);

            tournamentMap.computeIfAbsent(tournamentName, k -> new ArrayList<>()).add(gameInfo);
        }

        return tournamentMap;
    }

    
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
            List<Object[]> queryResult = entityManager.createNativeQuery(sql)
                    .setParameter(1, gameId)
                    .setParameter(2, packageName)
                    .getResultList();
    
            if (!queryResult.isEmpty()) {
                Object[] resultRow = queryResult.get(0);
    
                // Map values and handle nulls
                String tournamentName = resultRow[0] != null ? (String) resultRow[0] : "Unknown Tournament";
                String teamHome = resultRow[1] != null ? (String) resultRow[1] : "Unknown Team";
                String teamAway = resultRow[2] != null ? (String) resultRow[2] : "Unknown Team";
                Boolean isLive = resultRow[3] != null ? (Boolean) resultRow[3] : false;
                Boolean hasHighlights = resultRow[4] != null ? (Boolean) resultRow[4] : false;
    
                // Return values as a list
                return List.of(tournamentName, teamHome, teamAway, isLive, hasHighlights);
            } else {
                return List.of("Game not found", "Unknown Team", "Unknown Team", false, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return List.of("Error retrieving game details", "Unknown Team", "Unknown Team", false, false);
        }
    }
    
    

    // Methode zur Ausführung und Speicherung der Abfrage
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

        // Abfrage ausführen
        List<Object[]> queryResults = entityManager.createNativeQuery(sql)
                .setParameter(1, teams.toArray(new String[0]))
                .getResultList();

        // Liste der Paketabdeckungen aufbauen
        List<StreamingPackageCoverage> coverageList = new ArrayList<>();
        for (Object[] row : queryResults) {
            StreamingPackageCoverage coverage = new StreamingPackageCoverage();
            coverage.setPackageName((String) row[1]);
            coverage.setMonthlyPriceCents((Integer) row[2]);
            coverage.setMonthlyPriceYearlySubscriptionInCents((Integer) row[3]);

            // Set anstatt List für covered_games
            Set<Long> coveredGames = new HashSet<>(Arrays.asList((Long[]) row[4]));
            coverage.setCoveredGames(new ArrayList<>(coveredGames));
            coverageList.add(coverage);
        }

        // Kombinationen von Paketen finden, die alle Spiele abdecken
        Set<Long> requiredGames = new HashSet<>();
        // Alle Spiele des Teams sammeln
        for (StreamingPackageCoverage coverage : coverageList) {
            requiredGames.addAll(coverage.getCoveredGames());
        }

        // Kombinationen der Pakete finden, die alle Spiele abdecken
        List<List<StreamingPackageCoverage>> combinations = findPackageCombinations(coverageList, requiredGames);

        // Günstigste Kombination finden
        List<StreamingPackageCoverage> cheapestCombination = findCheapestPackageCombination(coverageList,
                requiredGames);

        return combinations; // Rückgabe der günstigsten Kombination
    }

    // Methode zur Kombination der Pakete, um alle Spiele abzudecken
    private List<List<StreamingPackageCoverage>> findPackageCombinations(List<StreamingPackageCoverage> packageList,
            Set<Long> requiredGames) {
        List<List<StreamingPackageCoverage>> result = new ArrayList<>();
        List<StreamingPackageCoverage> currentCombination = new ArrayList<>();
        Set<Long> coveredGames = new HashSet<>();

        // Greedy-Algorithmus verwenden, um die minimalen Kombinationen zu finden
        while (!coveredGames.containsAll(requiredGames)) {
            StreamingPackageCoverage bestPackage = null;
            int maxCoverage = 0;

            // Wähle das Paket, das die meisten noch nicht abgedeckten Spiele hinzufügt
            for (StreamingPackageCoverage currentPackage : packageList) {
                int coverageCount = getCoverageCount(currentPackage, coveredGames);
                if (coverageCount > maxCoverage) {
                    maxCoverage = coverageCount;
                    bestPackage = currentPackage;
                }
            }

            if (bestPackage == null)
                break;

            // Füge das beste Paket zur aktuellen Kombination hinzu
            currentCombination.add(bestPackage);
            coveredGames.addAll(bestPackage.getCoveredGames());
        }

        if (coveredGames.containsAll(requiredGames)) {
            result.add(new ArrayList<>(currentCombination));
        }

        return result;
    }

    // Hilfsmethode zur Berechnung der Anzahl der noch nicht abgedeckten Spiele
    private int getCoverageCount(StreamingPackageCoverage currentPackage, Set<Long> coveredGames) {
        Set<Long> uncoveredGames = new HashSet<>(currentPackage.getCoveredGames());
        uncoveredGames.removeAll(coveredGames);
        return uncoveredGames.size();
    }

    // Methode zur Suche nach der günstigsten Kombination der Pakete
    private List<StreamingPackageCoverage> findCheapestPackageCombination(List<StreamingPackageCoverage> packageList,
            Set<Long> requiredGames) {
        List<List<StreamingPackageCoverage>> allCombinations = findPackageCombinations(packageList, requiredGames);

        // Finde die Kombination mit dem niedrigsten Preis
        List<StreamingPackageCoverage> cheapestCombination = null;
        int minPrice = Integer.MAX_VALUE;

        for (List<StreamingPackageCoverage> combination : allCombinations) {
            int totalPrice = calculateTotalPrice(combination);
            if (totalPrice < minPrice) {
                minPrice = totalPrice;
                cheapestCombination = combination;
            }
        }

        return cheapestCombination;
    }

    // Hilfsmethode zur Berechnung des Gesamtpreises einer Kombination
    private int calculateTotalPrice(List<StreamingPackageCoverage> combination) {
        int totalPrice = 0;
        for (StreamingPackageCoverage coverage : combination) {
            Integer monthlyPrice = coverage.getMonthlyPriceCents();
            if (monthlyPrice != null) {
                totalPrice += monthlyPrice; // Wenn monatlicher Preis vorhanden ist
            } else {
                Integer yearlyPrice = coverage.getMonthlyPriceYearlySubscriptionInCents();
                if (yearlyPrice != null) {
                    totalPrice += yearlyPrice / 12; // Jahrespreis in monatlichen Preis umrechnen
                }
            }
        }
        return totalPrice;
    }
}
