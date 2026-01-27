package ir.accountingsystem.reactive.ws.backendaccountingsystem.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "classes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String grade;

    @Column(name = "class_name")
    private String className;

    private Integer fee;
}
