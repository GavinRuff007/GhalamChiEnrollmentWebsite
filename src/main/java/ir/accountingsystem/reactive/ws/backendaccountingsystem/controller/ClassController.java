package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.ClassModel;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.classes.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/classes")
@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "http://217.182.185.198:2025",
                "http://217.182.185.198",
        },
        allowCredentials = "true"
)
public class ClassController {

    private final ClassService classService;

    @GetMapping("/{grade}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ClassModel>> getClassesByGrade(@PathVariable String grade) {
        List<ClassModel> classes = classService.getClassesByGrade(grade);
        return ResponseEntity.ok(classes);
    }
}

