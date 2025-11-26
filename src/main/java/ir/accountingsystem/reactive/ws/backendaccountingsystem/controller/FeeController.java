package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeCalculationRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeCalculationResponse;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeInsertRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.FeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/fees")
@RequiredArgsConstructor
public class FeeController {

    private final FeeService feeService;

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
