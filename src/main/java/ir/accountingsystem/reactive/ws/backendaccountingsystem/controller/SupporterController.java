package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.SupporterInsertRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.SupporterResponse;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.support.SupporterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "http://217.182.185.198:2025",
                "http://217.182.185.198",
        },
        allowCredentials = "true"
)
public class SupporterController {

    private final SupporterService supporterService;

    @PostMapping("/add")
    public ResponseEntity<String> addSupporter(@RequestBody SupporterInsertRequest request) {
        supporterService.insertSupporterWithFee(request);
        return ResponseEntity.ok("ثبت شد");
    }

    @GetMapping("/list")
    public ResponseEntity<List<SupporterResponse>> list() {
        return ResponseEntity.ok(supporterService.getAllSupporters());
    }
}
