package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.Recruiter;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.RecruiterRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.recruiter.RecruiterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiters")
@RequiredArgsConstructor
public class RecruiterController {

    private final RecruiterService service;

    // 🔹 GET list
    @GetMapping
    public List<Recruiter> list() {
        return service.findAll();
    }

    // 🔹 POST add
    @PostMapping
    public Recruiter add(@RequestBody RecruiterRequest request) {
        return service.add(request.getName());
    }
}
