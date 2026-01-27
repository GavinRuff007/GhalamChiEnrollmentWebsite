package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExamScheduleResponse {

    private Long id;
    private String date;
    private Long price;
    private Season season;

}
