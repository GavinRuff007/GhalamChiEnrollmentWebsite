package ir.accountingsystem.reactive.ws.backendaccountingsystem.repository;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.StudentPersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentPersonalInfoRepository
        extends JpaRepository<StudentPersonalInfo, Long> {
}
