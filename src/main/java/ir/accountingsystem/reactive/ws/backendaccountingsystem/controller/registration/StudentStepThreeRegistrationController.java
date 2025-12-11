package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller.registration;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeInfo;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.registration.StudentStepThreeRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register/step3")
@RequiredArgsConstructor
public class StudentStepThreeRegistrationController {

    private final StudentStepThreeRegistrationService service;

    @PostMapping
    public ResponseEntity<FeeInfo> saveStep3(@RequestBody FeeInfo info) {

        if (info.getNationalCode() == null || info.getNationalCode().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        FeeInfo saved = service.saveStep3(info);
        return ResponseEntity.ok(saved);
    }


    @GetMapping("/{nationalCode}")
    public ResponseEntity<FeeInfo> getStep3(@PathVariable String nationalCode) {

        FeeInfo result = service.getStep3(nationalCode);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }
}
