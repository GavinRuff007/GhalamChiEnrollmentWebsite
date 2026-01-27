package ir.accountingsystem.reactive.ws.backendaccountingsystem.repository;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.ClassSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassSessionRepository extends JpaRepository<ClassSession, Long> {
    List<ClassSession> findByGrade(String grade);
}
