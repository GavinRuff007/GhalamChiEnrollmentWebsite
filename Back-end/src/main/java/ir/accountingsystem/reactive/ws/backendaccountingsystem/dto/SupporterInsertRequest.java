package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import lombok.Data;

@Data
public class SupporterInsertRequest {
    private String fullName;
    private String nationalCode;
    private Integer dailyPrice;
    private Season season;
}
