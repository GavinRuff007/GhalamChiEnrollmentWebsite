package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import lombok.Data;

@Data
public class FeeInsertRequest {
    private Integer classFee;
    private Integer examFee;
    private Integer bookFee;
}
