package gendev.repositories;

import jakarta.enterprise.context.ApplicationScoped;
import gendev.entity.StreamingPackageCoverage;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class StreamingPackageCoverageRepository implements PanacheRepository<StreamingPackageCoverage> {
}
