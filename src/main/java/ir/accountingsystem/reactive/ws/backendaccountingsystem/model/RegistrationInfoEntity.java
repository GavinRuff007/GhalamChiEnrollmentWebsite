package ir.accountingsystem.reactive.ws.backendaccountingsystem.model;

import jakarta.persistence.*;
import lombok.Data;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.dto.RegistrationInfo;

@Data
@Entity
@Table(name = "students_registration_info")
public class RegistrationInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "national_code", nullable = false)
    private String nationalCode;

    private String typeOption;
    private String recruiter;

    private String examCount;
    private String bookVoucher;

    private Integer discountExam;
    private Integer discountClass;
    private Integer classCount;

    private Boolean specialSupport;

    private Long supporterId;
    private String supportStart;
    private String supportEnd;
    private Integer supportDays;
    private Integer supportDailyPrice;
    private Integer supportFee;

    private Integer classFee;
    private Integer examFee;
    private Integer bookFee;
    private Integer totalFee;

    // ------------------------ DTO → Entity ------------------------
    public static RegistrationInfoEntity fromDto(RegistrationInfo dto) {
        RegistrationInfoEntity e = new RegistrationInfoEntity();

        e.setId(dto.getId());
        e.setNationalCode(dto.getNationalCode());

        e.setTypeOption(dto.getTypeOption());
        e.setRecruiter(dto.getRecruiter());

        e.setExamCount(dto.getExamCount());
        e.setBookVoucher(dto.getBookVoucher());

        e.setDiscountExam(dto.getDiscountExam());
        e.setDiscountClass(dto.getDiscountClass());
        e.setClassCount(dto.getClassCount());

        e.setSpecialSupport(dto.getSpecialSupport());

        e.setSupporterId(dto.getSupporterId());
        e.setSupportStart(dto.getSupportStart());
        e.setSupportEnd(dto.getSupportEnd());
        e.setSupportDays(dto.getSupportDays());
        e.setSupportDailyPrice(dto.getSupportDailyPrice());
        e.setSupportFee(dto.getSupportFee());

        e.setClassFee(dto.getClassFee());
        e.setExamFee(dto.getExamFee());
        e.setBookFee(dto.getBookFee());
        e.setTotalFee(dto.getTotalFee());

        return e;
    }

    // ------------------------ Entity → DTO ------------------------
    public RegistrationInfo toDto() {
        RegistrationInfo d = new RegistrationInfo();

        d.setId(this.id);
        d.setNationalCode(this.nationalCode);

        d.setTypeOption(this.typeOption);
        d.setRecruiter(this.recruiter);

        d.setExamCount(this.examCount);
        d.setBookVoucher(this.bookVoucher);

        d.setDiscountExam(this.discountExam);
        d.setDiscountClass(this.discountClass);
        d.setClassCount(this.classCount);

        d.setSpecialSupport(this.specialSupport);

        d.setSupporterId(this.supporterId);
        d.setSupportStart(this.supportStart);
        d.setSupportEnd(this.supportEnd);
        d.setSupportDays(this.supportDays);
        d.setSupportDailyPrice(this.supportDailyPrice);
        d.setSupportFee(this.supportFee);

        d.setClassFee(this.classFee);
        d.setExamFee(this.examFee);
        d.setBookFee(this.bookFee);
        d.setTotalFee(this.totalFee);

        return d;
    }
}
