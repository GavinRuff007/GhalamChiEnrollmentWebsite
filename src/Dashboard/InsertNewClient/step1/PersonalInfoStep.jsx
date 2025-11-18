// src/PersonalInfoStep.jsx
import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const PersonalInfoStep = ({ formData, errors, setFormData, handleChange, handleGradeChange }) => {
  const handleNationalCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length <= 10) {
      setFormData({ ...formData, nationalCode: value });
    }
  };

  return (
    <>
      <h3>فرم اطلاعات شخصی</h3>
      <form className="student-form">
        <div className="form-grid">
          {/* ===== کد مالی (الزامی) ===== */}
          <div className="form-group">
            <label>
              کد مالی <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="مثلاً 12345"
              className={errors.code ? "error" : ""}
            />
            {errors.code && <span className="error-text">{errors.code}</span>}
          </div>

          {/* ===== تاریخ ثبت‌نام (الزامی) ===== */}
          <div className="form-group">
            <label>
              تاریخ ثبت‌نام <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={formData.date}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  date: date?.format?.("YYYY/MM/DD") || "",
                })
              }
              inputClass="custom-input"
              containerStyle={{ width: "100%" }}
              placeholder="تاریخ را انتخاب کنید"
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          {/* ===== نام (الزامی) ===== */}
          <div className="form-group">
            <label>
              نام <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* ===== نام خانوادگی (الزامی) ===== */}
          <div className="form-group">
            <label>
              نام خانوادگی <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="family"
              value={formData.family}
              onChange={handleChange}
              className={errors.family ? "error" : ""}
            />
            {errors.family && <span className="error-text">{errors.family}</span>}
          </div>

          {/* ===== پایه تحصیلی (الزامی) ===== */}
          <div className="form-group">
            <label>
              پایه تحصیلی <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={(e) => {
                handleChange(e);
                handleGradeChange(e.target.value);
              }}
              className={errors.grade ? "error" : ""}
            >
              <option value="">انتخاب کنید</option>

              {/* 🔹 دوره ابتدایی و اول دبیرستان */}
              <optgroup label="دوره ابتدایی و اول دبیرستان">
                {[...Array(8)].map((_, i) => (
                  <option key={i + 2} value={i + 2}>
                    پایه {i + 2}
                  </option>
                ))}
              </optgroup>

              {/* 🔹 دوره دوم دبیرستان - رشته‌های نظری */}
              <optgroup label="دوره دوم دبیرستان - رشته‌های نظری">
                <option value="10-ریاضی">پایه 10 ریاضی</option>
                <option value="11-ریاضی">پایه 11 ریاضی</option>
                <option value="12-ریاضی">پایه 12 ریاضی</option>
                <option value="10-تجربی">پایه 10 تجربی</option>
                <option value="11-تجربی">پایه 11 تجربی</option>
                <option value="12-تجربی">پایه 12 تجربی</option>
                <option value="10-انسانی">پایه 10 انسانی</option>
                <option value="11-انسانی">پایه 11 انسانی</option>
                <option value="12-انسانی">پایه 12 انسانی</option>
              </optgroup>

              {/* 🔹 هنرستان (افزوده جدید) */}
              <optgroup label="دوره دوم دبیرستان - هنرستان">
                <option value="10-هنرستان">پایه 10 هنرستان</option>
                <option value="11-هنرستان">پایه 11 هنرستان</option>
                <option value="12-هنرستان">پایه 12 هنرستان</option>
              </optgroup>
            </select>
            {errors.grade && <span className="error-text">{errors.grade}</span>}
          </div>

          {/* ===== جنسیت (الزامی) ===== */}
          <div className="form-group">
            <label>
              جنسیت <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? "error" : ""}
            >
              <option value="">انتخاب کنید</option>
              <option value="پسر">پسر</option>
              <option value="دختر">دختر</option>
            </select>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>

          {/* ===== تلفن دانش‌آموز (الزامی) ===== */}
          <div className="form-group">
            <label>
              تلفن دانش‌آموز <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              placeholder="0912..."
              className={errors.phone1 ? "error" : ""}
            />
            {errors.phone1 && <span className="error-text">{errors.phone1}</span>}
          </div>

          {/* ===== تلفن ۲ (اختیاری) ===== */}
          <div className="form-group">
            <label>تلفن ۲ (اختیاری)</label>
            <input
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              placeholder="اختیاری"
            />
          </div>

          {/* ===== تلفن مادر (اختیاری) ===== */}
          <div className="form-group">
            <label>تلفن مادر (اختیاری)</label>
            <input
              name="motherPhone"
              value={formData.motherPhone}
              onChange={handleChange}
              placeholder="09..."
            />
          </div>

          {/* ===== تلفن منزل (اختیاری) ===== */}
          <div className="form-group">
            <label>تلفن منزل (اختیاری)</label>
            <input
              name="homePhone"
              value={formData.homePhone}
              onChange={handleChange}
              placeholder="شماره ثابت"
            />
          </div>

          {/* ===== مدرسه (اختیاری) ===== */}
          <div className="form-group">
            <label>مدرسه (اختیاری)</label>
            <input
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="نام مدرسه (اختیاری)"
            />
          </div>

          {/* ===== معدل (اختیاری، عدد یا توصیفی) ===== */}
          <div className="form-group">
            <label>معدل (اختیاری)</label>
            <input
              type="text"
              name="avg"
              value={formData.avg}
              onChange={handleChange}
              placeholder="مثلاً 18.75 یا خیلی خوب"
            />
          </div>

          {/* ===== کد ملی (الزامی + ۱۰ رقمی) ===== */}
          <div className="form-group">
            <label>
              کد ملی <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="nationalCode"
              value={formData.nationalCode}
              onChange={handleNationalCodeChange}
              placeholder="۱۰ رقم عددی"
              className={errors.nationalCode ? "error" : ""}
            />
            {errors.nationalCode && (
              <span className="error-text">{errors.nationalCode}</span>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalInfoStep;
