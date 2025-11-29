package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import lombok.Data;

@Data
public class RegistrationInfo {

    private Long id;
    private String nationalCode;

    private String typeOption;
    private String recruiter;

    private String examCount;
    private String bookVoucher;

    private Integer discountExam;
    private Integer discountClass;
    private Integer classCount;

    private Boolean specialSupport;

    private Long supporterId;
    private String supportStart;
    private String supportEnd;
    private Integer supportDays;
    private Integer supportDailyPrice;
    private Integer supportFee;

    private Integer classFee;
    private Integer examFee;
    private Integer bookFee;
    private Integer totalFee;
}
