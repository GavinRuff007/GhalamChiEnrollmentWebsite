package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.exam;

import com.github.mfathi91.time.PersianDate;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.ExamScheduleRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.ExamScheduleResponse;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.Season;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.ExamSchedule;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.ExamScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamScheduleService {

    private final ExamScheduleRepository repository;

    // ========================
    // GET
    // ========================
    public List<ExamScheduleResponse> getAll() {
        return repository.findByActiveTrueOrderByExamDateAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ========================
    // POST
    // ========================
    public ExamScheduleResponse create(ExamScheduleRequest request) {

        // 🔁 شمسی → میلادی
        LocalDate gregorianDate =
                PersianDate.parse(request.getDate()).toGregorian();

        ExamSchedule exam = new ExamSchedule();
        exam.setExamDate(gregorianDate);
        exam.setPrice(request.getPrice());
        exam.setActive(true);

        ExamSchedule saved = repository.save(exam);
        return toResponse(saved);
    }

    // ========================
    // Mapper
    // ========================
    private ExamScheduleResponse toResponse(ExamSchedule exam) {

        PersianDate persianDate =
                PersianDate.fromGregorian(exam.getExamDate());

        return new ExamScheduleResponse(
                exam.getId(),
                persianDate.toString(),           // 👈 yyyy-MM-dd شمسی
                exam.getPrice(),
                resolveSeason(persianDate)
        );
    }

    // ========================
    // Season by SHAMSI month
    // ========================
    private Season resolveSeason(PersianDate date) {
        int month = date.getMonthValue();

        if (month >= 1 && month <= 3) {
            return Season.SPRING;   // فروردین تا خرداد
        }
        if (month >= 4 && month <= 6) {
            return Season.SUMMER;   // تیر تا شهریور
        }
        if (month >= 7 && month <= 9) {
            return Season.AUTUMN;   // مهر تا آذر
        }
        return Season.WINTER;       // دی تا اسفند
    }
}
