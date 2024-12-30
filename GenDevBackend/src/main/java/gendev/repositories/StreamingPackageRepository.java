package gendev.repositories;

import java.util.Optional;

import gendev.entity.StreamingPackage;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;


@ApplicationScoped
public class StreamingPackageRepository implements PanacheRepository<StreamingPackage> {
    
    public Optional<StreamingPackage> findContactByEmail(Long streamingPackageId) {
        return find("id", streamingPackageId).firstResultOptional();
    }
}