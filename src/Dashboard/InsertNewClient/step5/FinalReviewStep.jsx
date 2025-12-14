import React from "react";
import { useSelector } from "react-redux";
import "./FinalReviewStep.css";

const FinalReviewStep = () => {
  const { personalInfo, registrationInfo, feeInfo } = useSelector(
    (state) => state.form
  );

  return (
    <div className="next-page final-review">
      <h3>مرحله پنجم: بررسی نهایی اطلاعات</h3>

      {/* ===================== */}
      {/* Step 1: Personal Info */}
      {/* ===================== */}
      <section className="review-box">
        <h4>👤 اطلاعات شخصی</h4>
        <div className="review-grid">
          <Item label="نام" value={personalInfo?.name} />
          <Item label="نام خانوادگی" value={personalInfo?.family} />
          <Item label="کد ملی" value={personalInfo?.nationalCode} />
          <Item label="شماره موبایل" value={personalInfo?.phone1} />
          <Item label="پایه تحصیلی" value={personalInfo?.grade} />
          <Item label="جنسیت" value={personalInfo?.gender} />
          <Item label="تاریخ تولد" value={personalInfo?.date} />
        </div>
      </section>

      {/* ========================== */}
      {/* Step 2: Registration Info */}
      {/* ========================== */}
      <section className="review-box">
        <h4>📚 اطلاعات ثبت‌نام</h4>
        <div className="review-grid">
          <Item label="نوع ثبت‌نام" value={registrationInfo?.typeOption} />
          <Item label="تعداد آزمون" value={registrationInfo?.examCount} />
          <Item label="تعداد کلاس" value={registrationInfo?.classCount} />
          <Item
            label="پشتیبانی ویژه"
            value={registrationInfo?.specialSupport ? "دارد" : "ندارد"}
          />
          <Item
            label="تخفیف آزمون"
            value={registrationInfo?.discountExam}
          />
          <Item
            label="تخفیف کلاس"
            value={registrationInfo?.discountClass}
          />
        </div>
      </section>

      {/* ===================== */}
      {/* Step 3: Fee Info */}
      {/* ===================== */}
      <section className="review-box">
        <h4>💰 اطلاعات شهریه</h4>

        <div className="review-grid">
          <Item
            label="جمع کل شهریه"
            value={
              feeInfo?.total_fee
                ? feeInfo.total_fee.toLocaleString("fa-IR") + " تومان"
                : "-"
            }
          />
        </div>

        <div className="payments-box">
          <h5>روش‌های پرداخت</h5>
          {feeInfo?.payments?.length > 0 ? (
            feeInfo.payments.map((p, idx) => (
              <div key={idx} className="payment-row">
                <span>نوع: {p.type || "نامشخص"}</span>
                <span>
                  مبلغ:{" "}
                  {Number(p.amount || 0).toLocaleString("fa-IR")} تومان
                </span>
                {p.startDate && <span>از: {p.startDate}</span>}
                {p.endDate && <span>تا: {p.endDate}</span>}
              </div>
            ))
          ) : (
            <p className="empty">پرداختی ثبت نشده است</p>
          )}
        </div>
      </section>

      {/* ===================== */}
      {/* Step 4: Documents */}
      {/* ===================== */}
      <section className="review-box">
        <h4>📎 مدارک بارگذاری‌شده</h4>
        <p className="hint">
          (در این نسخه فقط وضعیت مرحله نمایش داده می‌شود)
        </p>
      </section>

      {/* ===================== */}
      {/* Final Warning */}
      {/* ===================== */}
      <div className="final-warning">
        ⚠️ لطفاً قبل از تأیید نهایی، صحت تمام اطلاعات را بررسی کنید.
      </div>
    </div>
  );
};

const Item = ({ label, value }) => (
  <div className="review-item">
    <span className="label">{label}:</span>
    <span className="value">{value || "-"}</span>
  </div>
);

export default FinalReviewStep;
