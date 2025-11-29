package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import lombok.Data;

@Data
public class SupporterInsertRequest {
    private String fullName;
    private String nationalCode;  // optional
    private Integer dailyPrice;   // هزینه یک روز
}
