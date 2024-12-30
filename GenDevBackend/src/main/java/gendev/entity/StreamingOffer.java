package gendev.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "bc_streaming_offer")
public class StreamingOffer {

    @Id
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @Id
    @ManyToOne
    @JoinColumn(name = "streaming_package_id")
    private StreamingPackage streamingPackage;

    @Column(name = "live")
    private Boolean live;

    @Column(name = "highlights")
    private Boolean highlights;

    // Getter und Setter
    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public StreamingPackage getStreamingPackage() {
        return streamingPackage;
    }

    public void setStreamingPackage(StreamingPackage streamingPackage) {
        this.streamingPackage = streamingPackage;
    }

    public Boolean getLive() {
        return live;
    }

    public void setLive(Boolean live) {
        this.live = live;
    }

    public Boolean getHighlights() {
        return highlights;
    }

    public void setHighlights(Boolean highlights) {
        this.highlights = highlights;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StreamingOffer that = (StreamingOffer) o;
        return Objects.equals(game, that.game) &&
               Objects.equals(streamingPackage, that.streamingPackage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(game, streamingPackage);
    }

}
