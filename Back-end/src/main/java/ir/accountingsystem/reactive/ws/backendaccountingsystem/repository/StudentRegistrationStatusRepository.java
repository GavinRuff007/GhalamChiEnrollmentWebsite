package ir.accountingsystem.reactive.ws.backendaccountingsystem.repository;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.StudentRegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRegistrationStatusRepository extends JpaRepository<StudentRegistrationStatus, Long> {

    Optional<StudentRegistrationStatus> findByNationalCode(String nationalCode);

    List<StudentRegistrationStatus> findAllByOrderByCreatedAtDesc();

}
