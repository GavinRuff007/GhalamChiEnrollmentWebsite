package ir.accountingsystem.reactive.ws.backendaccountingsystem.repository;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.ExamSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamScheduleRepository
        extends JpaRepository<ExamSchedule, Long> {

    List<ExamSchedule> findByActiveTrueOrderByExamDateAsc();
}
