package ir.accountingsystem.reactive.ws.backendaccountingsystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "supporter_daily_fee")
@Data
public class SupporterDailyFee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "supporter_id", nullable = false)
    private Long supporterId;

    @Column(name = "daily_price", nullable = false)
    private Integer dailyPrice;

    @Column(name = "created_at")
    private String createdAt;
}
