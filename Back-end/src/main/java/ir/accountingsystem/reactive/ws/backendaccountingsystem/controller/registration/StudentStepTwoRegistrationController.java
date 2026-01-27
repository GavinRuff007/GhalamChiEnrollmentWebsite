package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller.registration;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.RegistrationInfo;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.registration.StudentStepTwoRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register/step2")
@RequiredArgsConstructor
public class StudentStepTwoRegistrationController {

    private final StudentStepTwoRegistrationService service;

    @PostMapping
    public ResponseEntity<RegistrationInfo> saveStep2(@RequestBody RegistrationInfo info) {

        if (info.getNationalCode() == null || info.getNationalCode().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        RegistrationInfo saved = service.saveStep2(info);
        return ResponseEntity.ok(saved);
    }


    @GetMapping("/{nationalCode}")
    public ResponseEntity<RegistrationInfo> getStep2(@PathVariable String nationalCode) {

        RegistrationInfo result = service.getStep2(nationalCode);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }
}
