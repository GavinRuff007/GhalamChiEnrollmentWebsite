package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FeeCalculationResponse {
    private Integer class_fee;
    private Integer exam_fee;
    private Integer book_fee;
    private Integer total_fee;
    private Integer support_fee;
}

