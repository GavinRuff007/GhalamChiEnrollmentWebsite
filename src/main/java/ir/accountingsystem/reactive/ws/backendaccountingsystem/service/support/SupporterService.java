package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.support;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.SupporterInsertRequest;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.SupporterResponse;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.SpecialSupporter;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.SupporterDailyFee;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.SpecialSupporterRepository;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.SupporterDailyFeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupporterService {

    private final SpecialSupporterRepository supporterRepository;
    private final SupporterDailyFeeRepository dailyFeeRepository;

    // INSERT Service
    public void insertSupporterWithFee(SupporterInsertRequest request) {

        // ذخیره پشتیبان
        SpecialSupporter supporter = new SpecialSupporter();
        supporter.setFullName(request.getFullName());
        supporter.setNationalCode(request.getNationalCode());
        supporter.setSeason(request.getSeason().toString());

        supporter = supporterRepository.save(supporter);

        // ذخیره هزینه روزانه
        SupporterDailyFee fee = new SupporterDailyFee();
        fee.setSupporterId(supporter.getId());
        fee.setDailyPrice(request.getDailyPrice());

        dailyFeeRepository.save(fee);
    }

    public List<SupporterResponse> getAllSupporters() {

        List<SpecialSupporter> supporters = supporterRepository.findAll();
        List<SupporterDailyFee> fees = dailyFeeRepository.findAll();

        Map<Long, Integer> feeMap = fees.stream()
                .collect(Collectors.toMap(SupporterDailyFee::getSupporterId, SupporterDailyFee::getDailyPrice));

        return supporters.stream()
                .map(s -> SupporterResponse.builder()
                        .id(s.getId())
                        .fullName(s.getFullName())
                        .nationalCode(s.getNationalCode())
                        .dailyPrice(feeMap.get(s.getId()))
                        .season(s.getSeason())
                        .build())
                .toList();
    }

}
