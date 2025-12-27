package ir.accountingsystem.reactive.ws.backendaccountingsystem.model;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.Gender;
import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "student_registration_status")
public class StudentRegistrationStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String family;

    @Column(name = "national_code", nullable = false)
    private String nationalCode;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "step1_id")
    private Long step1Id;

    @Column(name = "step2_id")
    private Long step2Id;

    @Column(name = "step3_id")
    private Long step3Id;

    @Column(name = "step4_id")
    private Long step4Id;

    @Column(name = "completed_steps")
    private Integer completedSteps = 0;

    @Column(name = "gender")
    private String gender;

    @Column(name = "created_at", insertable = false, updatable = false)
    private java.sql.Timestamp createdAt;
}
