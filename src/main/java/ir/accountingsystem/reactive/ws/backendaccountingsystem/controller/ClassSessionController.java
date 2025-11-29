package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.ClassSession;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.classes.ClassSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "http://217.182.185.198:2025",
                "http://217.182.185.198",
        },
        allowCredentials = "true"
)
public class ClassSessionController {

    private final ClassSessionService service;

    public ClassSessionController(ClassSessionService service) {
        this.service = service;
    }

    @GetMapping("/list")
    public List<ClassSession> getAllSessions() {
        return service.getAllSessions();
    }

    @GetMapping("/{grade}")
    public ResponseEntity<List<ClassSession>> getSessions(@PathVariable String grade) {
        return ResponseEntity.ok(service.getSessionsByGrade(grade));
    }
}
