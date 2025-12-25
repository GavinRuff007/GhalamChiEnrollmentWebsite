package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.recruiter;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.Recruiter;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.RecruiterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruiterService {

    private final RecruiterRepository repository;

    public List<Recruiter> findAll() {
        return repository.findAll(Sort.by("name"));
    }

    public Recruiter add(String name) {
        if (repository.existsByName(name)) {
            throw new IllegalArgumentException("Recruiter already exists");
        }
        Recruiter r = new Recruiter();
        r.setName(name);
        return repository.save(r);
    }
}
