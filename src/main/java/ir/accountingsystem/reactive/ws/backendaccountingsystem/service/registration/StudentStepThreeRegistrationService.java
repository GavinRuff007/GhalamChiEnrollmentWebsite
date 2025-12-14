package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.registration;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeInfo;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.FeeInfoEntity;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.FeeInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentStepThreeRegistrationService {

    private final FeeInfoRepository repository;
    private final StudentRegistrationStatusService statusService;
    private final ObjectMapper mapper = new ObjectMapper();

    private String normalizeLong(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }

    public FeeInfo saveStep3(FeeInfo dto) {

        FeeInfoEntity entity = new FeeInfoEntity();
        entity.setNationalCode(dto.getNationalCode());
        entity.setClassInitialFee(normalizeLong(dto.getClassInitialFee()));
        entity.setInstallment(dto.getInstallment());
        entity.setInstallmentCount(normalizeLong(dto.getInstallmentCount()));

        try {
            entity.setInstallmentsJson(mapper.writeValueAsString(dto.getInstallments()));
            entity.setSupportInstallmentsJson(mapper.writeValueAsString(dto.getSupportInstallments()));
            entity.setPaymentsJson(mapper.writeValueAsString(dto.getPayments()));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON error", e);
        }

        entity.setClassInitialFeeForSupport(normalizeLong(dto.getClassInitialFeeForSupport()));
        entity.setInstallmentSupport(dto.getInstallmentSupport());
        entity.setInstallmentCountSupport(normalizeLong(dto.getInstallmentCountSupport()));
        entity.setTotalFee(dto.getTotal_fee());


        FeeInfoEntity feeInfoEntity = repository.save(entity);
        statusService.attachStep3(dto.getNationalCode(), feeInfoEntity.getId());

        return dto;
    }

    public FeeInfo getStep3(String nationalCode) {
        return repository.findById(nationalCode)
                .map(entity -> {
                    FeeInfo dto = new FeeInfo();
                    dto.setNationalCode(entity.getNationalCode());
                    dto.setClassInitialFee(entity.getClassInitialFee());
                    dto.setInstallment(entity.getInstallment());
                    dto.setInstallmentCount(entity.getInstallmentCount());
                    dto.setTotal_fee(entity.getTotalFee());

                    try {
                        dto.setInstallments(
                                mapper.readValue(entity.getInstallmentsJson(),
                                        mapper.getTypeFactory().constructCollectionType(java.util.List.class, FeeInfo.InstallmentItem.class))
                        );

                        dto.setSupportInstallments(
                                mapper.readValue(entity.getSupportInstallmentsJson(),
                                        mapper.getTypeFactory().constructCollectionType(java.util.List.class, FeeInfo.InstallmentItem.class))
                        );

                        dto.setPayments(
                                mapper.readValue(entity.getPaymentsJson(),
                                        mapper.getTypeFactory().constructCollectionType(java.util.List.class, FeeInfo.PaymentItem.class))
                        );

                    } catch (Exception ignored) {}

                    return dto;
                })
                .orElse(null);
    }
}
