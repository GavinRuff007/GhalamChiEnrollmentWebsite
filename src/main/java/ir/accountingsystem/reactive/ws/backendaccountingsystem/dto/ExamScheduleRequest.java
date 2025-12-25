package ir.accountingsystem.reactive.ws.backendaccountingsystem.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;

@Getter
@Setter
public class ExamScheduleRequest {

    /**
     * تاریخ شمسی - مثال: 1404-09-10
     */
    @NonNull
    private String date;

    @NotNull
    private Long price;
}
