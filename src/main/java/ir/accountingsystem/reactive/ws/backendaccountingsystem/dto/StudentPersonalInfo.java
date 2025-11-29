package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "students_personal_info")
@Data
public class StudentPersonalInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String date;
    private String name;
    private String family;

    private String grade;
    private String gender;

    private String phone1;
    private String phone2;
    private String motherPhone;
    private String homePhone;

    private String school;
    private String avg;

    private String nationalCode;
}
