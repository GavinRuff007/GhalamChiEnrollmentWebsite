package ir.accountingsystem.reactive.ws.backendaccountingsystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "class_sessions")
public class ClassSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "class_name", nullable = false)
    private String className;

    @Column(name = "grade", nullable = false)
    private String grade;

    @Column(name = "start_date", nullable = false)
    private String startDate;

    @Column(name = "end_date", nullable = false)
    private String endDate;
}
