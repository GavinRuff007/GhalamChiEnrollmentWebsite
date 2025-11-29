package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.registration;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.RegistrationInfo;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.RegistrationInfoEntity;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.RegistrationInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class StudentStepTwoRegistrationService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final RegistrationInfoRepository repo;
    private final StudentRegistrationStatusService statusService;

    private String redisKey(String nationalCode) {
        return "register:step2:" + nationalCode;
    }

    // ============================================================
    // ذخیره Step 2
    // ============================================================
    public RegistrationInfo saveStep2(RegistrationInfo info) {

        String key = redisKey(info.getNationalCode());

        // 1) ابتدا Redis چک شود
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) {
            System.out.println("⚠ Step2 already cached – returning Redis version");
            return (RegistrationInfo) cached;
        }

        // 2) ذخیره در MySQL (entity تبدیل از DTO)
        RegistrationInfoEntity saved = repo.save(
                RegistrationInfoEntity.fromDto(info)
        );

        // 3) ذخیره در Redis (برای 1 ساعت)
        redisTemplate.opsForValue().set(key, info, 1, TimeUnit.HOURS);

        // 4) اتصال به جدول وضعیت ثبت‌نام (StudentRegistrationStatus)
        statusService.attachStep2(info.getNationalCode(), saved.getId());

        return info;
    }

    // ============================================================
    // گرفتن Step 2
    // ============================================================
    public RegistrationInfo getStep2(String nationalCode) {

        String key = redisKey(nationalCode);

        // 1) ابتدا Redis چک شود
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (RegistrationInfo) cached;

        // 2) جستجو در DB بر اساس nationalCode
        return repo
                .findAll()
                .stream()
                .filter(s -> s.getNationalCode().equals(nationalCode))
                .findFirst()
                .map(RegistrationInfoEntity::toDto)
                .orElse(null);
    }
}
