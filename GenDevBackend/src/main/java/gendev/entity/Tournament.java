package gendev.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tournamentName;
     
    @ElementCollection
    private List<GameInfo> coveredGames;

    public String getTournamentName() {
        return tournamentName;
    }

    public void setTournamentName(String tournamentName) {
        this.tournamentName = tournamentName;
    }

    public List<GameInfo> getGameInfos() {
        return coveredGames;
    }

    public void setGameInfos(List<GameInfo> gameInfos) {
        this.coveredGames = gameInfos;
    }

    @Override
    public String toString() {
        return "Tournament{" +
                "name='" + tournamentName + '\'' +
                ", gameIds=" + coveredGames +
                '}';
    }
}
