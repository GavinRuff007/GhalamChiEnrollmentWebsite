package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

// Request DTO

import lombok.Data;

@Data
public class FeeCalculationRequest {
    private String typeOption;   // مثل "1کلاس+آزمون"
    private Integer examCount;   // تعداد آزمون ثبت‌نامی
    private Integer discountExam;
    private Integer discountClass;
    private Integer classCount;
}

