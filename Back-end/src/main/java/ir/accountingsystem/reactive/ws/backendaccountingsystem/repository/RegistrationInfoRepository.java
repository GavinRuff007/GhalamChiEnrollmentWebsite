package ir.accountingsystem.reactive.ws.backendaccountingsystem.repository;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.RegistrationInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationInfoRepository
        extends JpaRepository<RegistrationInfoEntity, Long> { }
