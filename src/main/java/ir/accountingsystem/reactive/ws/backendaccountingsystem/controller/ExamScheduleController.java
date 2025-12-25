package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.ExamScheduleRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.ExamScheduleResponse;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.exam.ExamScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamScheduleController {

    private final ExamScheduleService service;

    /**
     * GET - دریافت تمام آزمون‌ها
     */
    @GetMapping
    public List<ExamScheduleResponse> getAllExams() {
        return service.getAll();
    }

    /**
     * POST - ایجاد آزمون جدید
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExamScheduleResponse createExam(
             @RequestBody ExamScheduleRequest request
    ) {
        return service.create(request);
    }
}

