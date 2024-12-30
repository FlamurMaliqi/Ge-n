package gendev.entity;

import java.util.List;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class StreamingPackageCoverageDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String packageName;
    private Integer monthlyPriceCents;
    private Integer monthlyPriceYearlySubscriptionInCents;
    private List<Tournament> coveredGames;

    // Getter und Setter

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

    public List<Tournament> getCoveredGames() {
        return coveredGames;
    }

    public void setCoveredGames(List<Tournament> coveredGames) {
        this.coveredGames = coveredGames;
    }

    // Optionale Methode zur Debug-Ausgabe
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

