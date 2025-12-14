package ir.accountingsystem.reactive.ws.backendaccountingsystem.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "student_fee_info")
public class FeeInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nationalCode;

    @Lob
    @Column(name = "class_initial_fee")
    private String classInitialFee;

    private String installment;
    private String installmentCount;

    @Lob
    private String installmentsJson;

    @Lob
    private String classInitialFeeForSupport;

    private String installmentSupport;
    private String installmentCountSupport;

    @Lob
    private String supportInstallmentsJson;

    private Long totalFee;

    @Lob
    private String paymentsJson;
}
