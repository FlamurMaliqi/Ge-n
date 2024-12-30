package gendev.repositories;

import java.util.List;

import gendev.entity.GameInfo;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@ApplicationScoped
public class GameInfoRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public GameInfo findById(Long id) {
        return entityManager.find(GameInfo.class, id);
    }

    public void save(GameInfo gameInfo) {
        entityManager.persist(gameInfo);
    }

    public void update(GameInfo gameInfo) {
        entityManager.merge(gameInfo);
    }

    public void delete(Long id) {
        GameInfo gameInfo = findById(id);
        if (gameInfo != null) {
            entityManager.remove(gameInfo);
        }
    }

    // Zusätzliche Methoden nach Bedarf, z. B. alle Spiele für ein bestimmtes Turnier
    public List<GameInfo> findAll() {
        return entityManager.createQuery("SELECT g FROM GameInfo g", GameInfo.class).getResultList();
    }

    public List<GameInfo> findGamesByTournament(Long tournamentId) {
        return entityManager.createQuery("SELECT g FROM GameInfo g WHERE g.tournament.id = :tournamentId", GameInfo.class)
                            .setParameter("tournamentId", tournamentId)
                            .getResultList();
    }
}
