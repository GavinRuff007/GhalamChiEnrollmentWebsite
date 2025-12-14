package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.StudentRegistrationStatus;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.StudentRegistrationStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/records")
@RequiredArgsConstructor
public class StudentRegistrationStatusController {

    private final StudentRegistrationStatusRepository repository;

    @GetMapping
    public ResponseEntity<List<StudentRegistrationStatus>> getAll() {
        return ResponseEntity.ok(repository.findAllByOrderByCreatedAtDesc());
    }
}
