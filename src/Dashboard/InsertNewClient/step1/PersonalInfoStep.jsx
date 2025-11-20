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

  const gradeNames = ["اول", "دوم", "سوم", "چهارم", "پنجم", "ششم"];

  return (
    <>
      <h3>فرم اطلاعات شخصی</h3>

      <form className="student-form">
        <div className="form-grid">

          {/* کد مالی */}
          <div className="form-group">
            <label>کد مالی <span style={{ color: "red" }}>*</span></label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="مثلاً 12345"
              className={errors.code ? "error" : ""}
            />
            {errors.code && <span className="error-text">{errors.code}</span>}
          </div>

          {/* تاریخ ثبت‌نام */}
          <div className="form-group">
            <label>تاریخ ثبت‌نام <span style={{ color: "red" }}>*</span></label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={formData.date}
              onChange={(date) =>
                setFormData({ ...formData, date: date?.format?.("YYYY/MM/DD") || "" })
              }
              inputClass="custom-input"
              containerStyle={{ width: "100%" }}
              placeholder="تاریخ را انتخاب کنید"
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          {/* نام */}
          <div className="form-group">
            <label>نام <span style={{ color: "red" }}>*</span></label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* نام خانوادگی */}
          <div className="form-group">
            <label>نام خانوادگی <span style={{ color: "red" }}>*</span></label>
            <input
              name="family"
              value={formData.family}
              onChange={handleChange}
              className={errors.family ? "error" : ""}
            />
            {errors.family && <span className="error-text">{errors.family}</span>}
          </div>

          {/* پایه تحصیلی */}
          <div className="form-group">
            <label>پایه تحصیلی <span style={{ color: "red" }}>*</span></label>

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

              {/* ابتدایی */}
              <optgroup label="ابتدایی (اول تا ششم)">
                {gradeNames.map((title, index) => (
                  <option key={index} value={`ابتدایی-${index + 1}`}>
                    پایه {title}
                  </option>
                ))}
              </optgroup>

              {/* متوسطه اول */}
              <optgroup label="متوسطه اول (هفتم تا نهم)">
                <option value="متوسطه اول-7">پایه هفتم</option>
                <option value="متوسطه اول-8">پایه هشتم</option>
                <option value="متوسطه اول-9">پایه نهم</option>
              </optgroup>

              {/* متوسطه دوم - نظری */}
              <optgroup label="متوسطه دوم - رشته‌های نظری">
                <option value="10-ریاضی">پایه ۱۰ ریاضی</option>
                <option value="11-ریاضی">پایه ۱۱ ریاضی</option>
                <option value="12-ریاضی">پایه ۱۲ ریاضی</option>

                <option value="10-تجربی">پایه ۱۰ تجربی</option>
                <option value="11-تجربی">پایه ۱۱ تجربی</option>
                <option value="12-تجربی">پایه ۱۲ تجربی</option>

                <option value="10-انسانی">پایه ۱۰ انسانی</option>
                <option value="11-انسانی">پایه ۱۱ انسانی</option>
                <option value="12-انسانی">پایه ۱۲ انسانی</option>
              </optgroup>

              {/* هنرستان */}
              <optgroup label="متوسطه دوم - هنرستان">
                <option value="10-هنرستان">پایه ۱۰ هنرستان</option>
                <option value="11-هنرستان">پایه ۱۱ هنرستان</option>
                <option value="12-هنرستان">پایه ۱۲ هنرستان</option>
              </optgroup>

              {/* زبان / هنر / زبان‌ـ‌هنر */}
              <optgroup label="رشته‌های جانبی">
                <option value="زبان">زبان</option>
                <option value="هنر">هنر</option>
                <option value="زبان-هنر">زبان‌ـ‌هنر</option>
              </optgroup>

            </select>

            {errors.grade && <span className="error-text">{errors.grade}</span>}
          </div>

          {/* جنسیت */}
          <div className="form-group">
            <label>جنسیت <span style={{ color: "red" }}>*</span></label>
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

          {/* تلفن دانش آموز */}
          <div className="form-group">
            <label>تلفن دانش‌آموز <span style={{ color: "red" }}>*</span></label>
            <input
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              placeholder="0912..."
              className={errors.phone1 ? "error" : ""}
            />
            {errors.phone1 && <span className="error-text">{errors.phone1}</span>}
          </div>

          {/* تلفن دوم */}
          <div className="form-group">
            <label>تلفن منزل (اختیاری)</label>
            <input name="phone2" value={formData.phone2} onChange={handleChange} />
          </div>

          {/* تلفن مادر */}
          <div className="form-group">
            <label>تلفن مادر (اختیاری)</label>
            <input name="motherPhone" value={formData.motherPhone} onChange={handleChange} />
          </div>

          {/* تلفن منزل */}
          <div className="form-group">
            <label>تلفن منزل (اختیاری)</label>
            <input name="homePhone" value={formData.homePhone} onChange={handleChange} />
          </div>

          {/* مدرسه */}
          <div className="form-group">
            <label>مدرسه (اختیاری)</label>
            <input
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="نام مدرسه"
            />
          </div>

          {/* معدل */}
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

          {/* کد ملی */}
          <div className="form-group">
            <label>کد ملی <span style={{ color: "red" }}>*</span></label>
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
