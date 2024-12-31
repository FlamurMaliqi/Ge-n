package gendev.entity;

import java.util.List;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class StreamingPackageCoverage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String packageName;
    private Integer monthlyPriceCents;
    private Integer monthlyPriceYearlySubscriptionInCents;
    private List<Long> coveredGames;

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
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

    public List<Long> getCoveredGames() {
        return coveredGames;
    }

    public void setCoveredGames(List<Long> coveredGames) {
        this.coveredGames = coveredGames;
    }

    @Override
    public String toString() {
        return "StreamingPackageCoverage{" +
                "packageName='" + packageName + '\'' +
                ", monthlyPriceCents=" + monthlyPriceCents +
                ", monthlyPriceYearlySubscriptionInCents=" + monthlyPriceYearlySubscriptionInCents +
                ", coveredGames=" + coveredGames +
                '}';
    }
}
