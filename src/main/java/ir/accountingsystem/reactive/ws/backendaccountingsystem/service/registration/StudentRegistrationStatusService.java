package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.registration;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.StudentPersonalInfo;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.StudentRegistrationStatus;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.StudentRegistrationStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class StudentRegistrationStatusService {

    private final StudentRegistrationStatusRepository repo;

    public StudentRegistrationStatus attachStep1(StudentPersonalInfo info) {

        StudentRegistrationStatus status =
                repo.findByNationalCode(info.getNationalCode())
                        .orElse(new StudentRegistrationStatus());

        status.setName(info.getName());
        status.setFamily(info.getFamily());
        status.setNationalCode(info.getNationalCode());
        status.setMobileNumber(info.getPhone1());
        status.setStep1Id(info.getId());
        status.setCompletedSteps(1);

        return repo.save(status);
    }

    public StudentRegistrationStatus attachStep2(String nationalCode, Long step2Id) {

        StudentRegistrationStatus status =
                updateStatusTable(nationalCode, step2Id, 2);

        return repo.save(status);
    }

    public StudentRegistrationStatus attachStep3(String nationalCode, Long step3Id) {

        StudentRegistrationStatus status =
                updateStatusTable(nationalCode, step3Id, 3);

        return repo.save(status);
    }

    public StudentRegistrationStatus attachStep4(String nationalCode, Long step4Id) {

        StudentRegistrationStatus status =
                updateStatusTable(nationalCode, step4Id, 4);

        return repo.save(status);
    }

    // ====================================================
    //     محل صحیح updateStatusTable  (این کلاس)
    // ====================================================
    private StudentRegistrationStatus updateStatusTable(
            String nationalCode,
            Long stepId,
            int completedStepNumber
    ) {
        StudentRegistrationStatus status =
                repo.findByNationalCode(nationalCode)
                        .orElseThrow(() ->
                                new RuntimeException("StudentRegistrationStatus not found for nationalCode: " + nationalCode)
                        );

        // اتصال به مرحله مربوطه
        switch (completedStepNumber) {
            case 2 -> status.setStep2Id(stepId);
            case 3 -> status.setStep3Id(stepId);
            case 4 -> status.setStep4Id(stepId);
        }

        // مقدار مستقیم مرحله تکمیل شده
        status.setCompletedSteps(completedStepNumber);

        return status;
    }
}
