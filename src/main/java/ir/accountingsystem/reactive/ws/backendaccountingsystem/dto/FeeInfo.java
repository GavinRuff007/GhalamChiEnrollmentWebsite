package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Data;
import java.util.List;

@Data
public class FeeInfo {

    private String nationalCode;

    private String classInitialFee;
    private String installment;
    private String installmentCount;
    private List<InstallmentItem> installments;

    private String classInitialFeeForSupport;
    private String installmentSupport;
    private String installmentCountSupport;
    private List<InstallmentItem> supportInstallments;

    @JsonProperty("totalFee")
    private Long total_fee;

    private List<PaymentItem> payments;

    @Data
    public static class InstallmentItem {
        private String feeOption;
        private String customFee;
        private String date;
    }

    @Data
    public static class PaymentItem {
        private String type;
        private String amount;
        private String startDate;
        private String endDate;
    }
}
