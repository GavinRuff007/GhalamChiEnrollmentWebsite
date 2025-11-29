package ir.accountingsystem.reactive.ws.backendaccountingsystem.service.registration;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.StudentPersonalInfo;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.StudentRegistrationStatus;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.StudentPersonalInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class StudentStepOneRegistrationService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final StudentPersonalInfoRepository repo;
    private final StudentRegistrationStatusService statusService;

    private String redisKey(String nationalCode) {
        return "register:step1:" + nationalCode;
    }

    // ------------------------------------------------------------
    // ذخیره مرحله ۱ (Step1)
    // ------------------------------------------------------------
    public StudentPersonalInfo saveStep1(StudentPersonalInfo info) {

        String key = redisKey(info.getNationalCode());

        // 1) ابتدا Redis چک شود
        Object cached = redisTemplate.opsForValue().get(key);

        if (cached != null) {
            System.out.println("⚠ Step1 already exists in Redis → returning cached version");
            return (StudentPersonalInfo) cached;
        }

        // 2) ذخیره در دیتابیس (MySQL)
        StudentPersonalInfo saved = repo.save(info);

        // 3) ذخیره در جدول وضعیت (student_registration_status)
        StudentRegistrationStatus status = statusService.attachStep1(saved);
        System.out.println("✔ Step1 attached to status table with ID: " + status.getId());

        // 4) ذخیره در Redis — اعتبار ۱ ساعت
        redisTemplate.opsForValue().set(key, saved, 1, TimeUnit.HOURS);

        return saved;
    }

    // ------------------------------------------------------------
    // دریافت مرحله ۱ (Step1)
    // ------------------------------------------------------------
    public StudentPersonalInfo getStep1(String nationalCode) {

        String key = redisKey(nationalCode);

        // 1) تلاش برای خواندن از Redis
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) {
            System.out.println("✔ Returning Step1 from Redis cache");
            return (StudentPersonalInfo) cached;
        }

        // 2) اگر در Redis نبود → از دیتابیس بخوان
        StudentPersonalInfo result = repo
                .findAll()
                .stream()
                .filter(s -> nationalCode.equals(s.getNationalCode()))
                .findFirst()
                .orElse(null);

        if (result != null) {
            // ذخیره مجدد در Redis برای بهبود سرعت آینده
            redisTemplate.opsForValue().set(key, result, 1, TimeUnit.HOURS);
        }

        return result;
    }
}
