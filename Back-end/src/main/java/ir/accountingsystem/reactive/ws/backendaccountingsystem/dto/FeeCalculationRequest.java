package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import lombok.Data;

@Data
public class FeeCalculationRequest {
    private String typeOption;
    private String examCount;
    private Integer discountExam;
    private Integer discountClass;
    private Integer classCount;
    private Object classInfo;
    private String bookVoucher;
    private Boolean specialSupport;
}
