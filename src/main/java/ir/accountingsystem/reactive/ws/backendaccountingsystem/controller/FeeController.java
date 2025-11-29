package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeCalculationRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeCalculationResponse;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeInsertRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.calculator.FeeCalculatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/fees")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FeeController {

    private final FeeCalculatorService feeService;

    @PostMapping("/insert")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> insertFee(@RequestBody FeeInsertRequest request) {
        feeService.insertFee(request);
        return ResponseEntity.ok(Map.of("state", "inserted"));
    }

    @PostMapping("/calculate")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FeeCalculationResponse> calculateFee(
            @RequestBody FeeCalculationRequest request) {
        FeeCalculationResponse response = feeService.calculate(request);
        return ResponseEntity.ok(response);
    }
}
