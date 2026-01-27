package ir.accountingsystem.reactive.ws.backendaccountingsystem.repository;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.ClassModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<ClassModel, Long> {

    List<ClassModel> findByGrade(String grade);
}

