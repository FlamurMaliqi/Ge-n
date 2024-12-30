package gendev.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bc_streaming_package")
public class StreamingPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "monthly_price_cents")
    private Integer monthlyPriceCents;

    @Column(name = "monthly_price_yearly_subscription_in_cents")
    private Integer monthlyPriceYearlySubscriptionInCents;

    // Getter und Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getMonthlyPriceCents() {
        return monthlyPriceCents;
    }

    public void setMonthlyPriceCents(Integer monthlyPriceCents) {
        this.monthlyPriceCents = monthlyPriceCents;
    }

    public Integer getMonthlyPriceYearlySubscriptionInCents() {
        return monthlyPriceYearlySubscriptionInCents;
    }

    public void setMonthlyPriceYearlySubscriptionInCents(Integer monthlyPriceYearlySubscriptionInCents) {
        this.monthlyPriceYearlySubscriptionInCents = monthlyPriceYearlySubscriptionInCents;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StreamingPackage that = (StreamingPackage) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
