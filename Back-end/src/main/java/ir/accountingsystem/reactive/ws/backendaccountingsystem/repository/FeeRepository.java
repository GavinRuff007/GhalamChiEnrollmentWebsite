package ir.accountingsystem.reactive.ws.backendaccountingsystem.repository;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.FeeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeRepository extends JpaRepository<FeeModel, Long> {
    FeeModel findTopByOrderByIdDesc();

}
