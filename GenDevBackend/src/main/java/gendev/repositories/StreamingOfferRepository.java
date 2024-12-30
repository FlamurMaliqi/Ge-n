package gendev.repositories;

import java.util.List;
import java.util.stream.Collectors;

import gendev.entity.StreamingOffer;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;


@ApplicationScoped
public class StreamingOfferRepository implements PanacheRepository<StreamingOffer> {
    
    public List<Long> findStreamingPackageIdsByGameId(Long gameId) {
        return list("game.id = ?1", gameId).stream() 
                .map(offer -> offer.getStreamingPackage().getId()) 
                .distinct()
                .collect(Collectors.toList());
    }
    
}