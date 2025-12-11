package ir.accountingsystem.reactive.ws.backendaccountingsystem.repository;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.FeeInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeInfoRepository extends JpaRepository<FeeInfoEntity, String> {
}
