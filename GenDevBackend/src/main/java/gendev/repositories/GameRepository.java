package gendev.repositories;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import gendev.entity.Game;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;


@ApplicationScoped
public class GameRepository implements PanacheRepository<Game> {

    public List<String> findAllTeamNames() {
        List<Game> games = listAll();
    
        return Stream.concat(
                Stream.of("Alle Spiele"), 
                games.stream()
                     .flatMap(game -> Stream.of(game.getTeamHome(), game.getTeamAway()))
            )
            .distinct() 
            .collect(Collectors.toList());
    }
     

    public List<Long> findGamesByTeamName(String teamName) {
        return list("teamHome = ?1 or teamAway = ?1", teamName).stream()
                .map(Game::getId) 
                .collect(Collectors.toList());
    }

}
