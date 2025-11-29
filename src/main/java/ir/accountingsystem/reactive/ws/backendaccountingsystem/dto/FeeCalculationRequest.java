package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import lombok.Data;

@Data
public class FeeCalculationRequest {
    private String typeOption;    // مثل "1", "1+آزمون", "هیچکدام"
    private String examCount;     // ممکن است "none" یا "" یا "3" باشد
    private Integer discountExam;
    private Integer discountClass;
    private Integer classCount;
    private Object classInfo;     // ⭐ اگر کلاس‌ها ارسال می‌شوند
    private String bookVoucher;   // ⭐ بله / خیر
    private Boolean specialSupport;
}
