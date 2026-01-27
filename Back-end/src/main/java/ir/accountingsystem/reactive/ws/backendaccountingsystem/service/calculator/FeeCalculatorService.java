package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.calculator;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeCalculationRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeCalculationResponse;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.FeeInsertRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.FeeModel;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.FeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeeCalculatorService {

    private final FeeRepository feeRepository;

    public void insertFee(FeeInsertRequest request) {
        FeeModel model = new FeeModel();
        model.setClassFee(request.getClassFee());
        model.setExamFee(request.getExamFee());
        model.setBookFee(request.getBookFee());
        feeRepository.save(model);
    }

    public FeeCalculationResponse calculate(FeeCalculationRequest request) {

        FeeModel fee = feeRepository.findTopByOrderByIdDesc();
        if (fee == null) {
            throw new RuntimeException("Fee table is empty");
        }

        int classCount = request.getClassCount() != null ? request.getClassCount() : 0;
        int classFeeTotal = classCount * fee.getClassFee();
        if (request.getDiscountClass() != null) {
            classFeeTotal -= request.getDiscountClass();
            if (classFeeTotal < 0) classFeeTotal = 0;
        }
        Integer examCount = 0;
        try {
            if (request.getExamCount() != null) {
                examCount = Integer.valueOf(request.getExamCount());
            }
        } catch (Exception ignored) {
            examCount = 0;
        }
        int examFeeTotal = examCount > 0 ? examCount * fee.getExamFee() : 0;
        if (request.getDiscountExam() != null) {
            examFeeTotal -= request.getDiscountExam();
            if (examFeeTotal < 0) examFeeTotal = 0;
        }
        int bookFee = 0;
        if ("بله".equalsIgnoreCase(request.getBookVoucher())) {
            bookFee = fee.getBookFee();
        }
        int total = classFeeTotal + examFeeTotal + bookFee;
        return FeeCalculationResponse.builder()
                .class_fee(classFeeTotal)
                .exam_fee(examFeeTotal)
                .book_fee(bookFee)
                .support_fee(0)
                .total_fee(total)
                .build();
    }
}
