package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.classes;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.ClassModel;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.ClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;

    public List<ClassModel> getClassesByGrade(String grade) {
        return classRepository.findByGrade(grade);
    }
}

