package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "recruiters")
@Data
public class Recruiter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    // getters & setters
}
