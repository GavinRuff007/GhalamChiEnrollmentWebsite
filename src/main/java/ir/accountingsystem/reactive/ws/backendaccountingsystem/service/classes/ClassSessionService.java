package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.classes;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.ClassSession;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.ClassSessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassSessionService {

    private final ClassSessionRepository classSessionRepository;

    public ClassSessionService(ClassSessionRepository classSessionRepository) {
        this.classSessionRepository = classSessionRepository;
    }

    public List<ClassSession> getAllSessions() {
        return classSessionRepository.findAll();
    }

    public List<ClassSession> getSessionsByGrade(String grade) {
        return classSessionRepository.findByGrade(grade);
    }
}
