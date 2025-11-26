package ir.accountingsystem.reactive.ws.backendaccountingsystem.service;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeCalculationRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeCalculationResponse;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeInsertRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.FeeModel;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.FeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeeService {

    private final FeeRepository feeRepository;

    public void insertFee(FeeInsertRequest request) {
        FeeModel model = new FeeModel();
        model.setClassFee(request.getClassFee());
        model.setExamFee(request.getExamFee());
        model.setBookFee(request.getBookFee());
        feeRepository.save(model);
    }

    public FeeCalculationResponse calculate(FeeCalculationRequest request) {

        FeeModel fee = feeRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Fee table is empty"));
        int classFeeTotal = request.getClassCount() * fee.getClassFee();
        classFeeTotal -= request.getDiscountClass() != null ? request.getDiscountClass() : 0;
        int examFeeTotal = (request.getExamCount() != null && request.getExamCount() > 0)
                ? request.getExamCount() * fee.getExamFee()
                : 0;
        examFeeTotal -= request.getDiscountExam() != null ? request.getDiscountExam() : 0;
        int bookFee = fee.getBookFee();
        int total = classFeeTotal + examFeeTotal + bookFee;
        return FeeCalculationResponse.builder()
                .class_fee(classFeeTotal)
                .exam_fee(examFeeTotal)
                .book_fee(bookFee)
                .total_fee(total)
                .build();
    }
}
