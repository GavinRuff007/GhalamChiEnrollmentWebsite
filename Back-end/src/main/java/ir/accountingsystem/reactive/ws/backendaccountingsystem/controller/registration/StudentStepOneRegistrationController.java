package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller.registration;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.StudentPersonalInfo;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.registration.StudentStepOneRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register/step1")
@RequiredArgsConstructor
public class StudentStepOneRegistrationController {

    private final StudentStepOneRegistrationService service;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> saveStep1(@RequestBody StudentPersonalInfo info) {
        StudentPersonalInfo saved = service.saveStep1(info);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{nationalCode}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getStep1(@PathVariable String nationalCode) {
        StudentPersonalInfo info = service.getStep1(nationalCode);
        return ResponseEntity.ok(info);
    }
}
