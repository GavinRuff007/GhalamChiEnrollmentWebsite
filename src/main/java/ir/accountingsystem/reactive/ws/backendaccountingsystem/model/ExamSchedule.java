package ir.accountingsystem.reactive.ws.backendaccountingsystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "exam_schedules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // تاریخ میلادی (internal)
    @Column(nullable = false)
    private LocalDate examDate;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private Boolean active = true;
}
