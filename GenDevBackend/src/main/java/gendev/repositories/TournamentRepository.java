package gendev.repositories;

import java.util.List;

import gendev.entity.Tournament;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@ApplicationScoped
public class TournamentRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public Tournament findById(Long id) {
        return entityManager.find(Tournament.class, id);
    }

    public void save(Tournament tournament) {
        entityManager.persist(tournament);
    }

    public void update(Tournament tournament) {
        entityManager.merge(tournament);
    }

    public void delete(Long id) {
        Tournament tournament = findById(id);
        if (tournament != null) {
            entityManager.remove(tournament);
        }
    }

    // Zusätzliche Methoden nach Bedarf, z. B. alle Turniere abrufen
    public List<Tournament> findAll() {
        return entityManager.createQuery("SELECT t FROM Tournament t", Tournament.class).getResultList();
    }
}
