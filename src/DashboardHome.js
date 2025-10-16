import React, { useState } from "react";
import "./DashboardHome.css";

const DashboardHome = () => {
  const steps = [
    { title: "اطلاعات شخص", number: 1 },
    { title: "شرایط ثبت‌نام", number: 2 },
    { title: "اطلاعات تکمیلی", number: 3 },
    { title: "مدارک مستند", number: 4 },
  ];

  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    code: "",
    date: "",
    name: "",
    family: "",
    grade: "",
    gender: "",
    phone1: "",
    phone2: "",
    motherPhone: "",
    homePhone: "",
    school: "",
    avg: "",
    nationalCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      code: "",
      date: "",
      name: "",
      family: "",
      grade: "",
      gender: "",
      phone1: "",
      phone2: "",
      motherPhone: "",
      homePhone: "",
      school: "",
      avg: "",
      nationalCode: "",
    });
  };

  const handleNext = () => {
    if (activeStep < steps.length) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  return (
    <div className="dashboard-home">
      {/* ===== هدر شامل دایره‌ها ===== */}
      <header className="dashboard-header">
        <div className="process-container">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div
                className={`circle ${
                  step.number <= activeStep ? "active" : ""
                }`}
              >
                {step.number}
              </div>
              <div className="label">{step.title}</div>
              {index < steps.length - 1 && <div className="line"></div>}
            </div>
          ))}
        </div>
      </header>

      {/* ===== محتوای هر مرحله ===== */}
      <main className="dashboard-content">
        {activeStep === 1 && (
          <>
            <h3>فرم اطلاعات شخصی</h3>
            <form className="student-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>کد مالی</label>
                  <input
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="مثلاً 12345"
                  />
                </div>
                <div className="form-group">
                  <label>تاریخ ثبت‌نام</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>نام</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>نام خانوادگی</label>
                  <input
                    name="family"
                    value={formData.family}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>پایه</label>
                  <input
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    placeholder="مثلاً نهم"
                  />
                </div>
                <div className="form-group">
                  <label>جنسیت</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="پسر">پسر</option>
                    <option value="دختر">دختر</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>تلفن دانش‌آموز</label>
                  <input
                    name="phone1"
                    value={formData.phone1}
                    onChange={handleChange}
                    placeholder="0912..."
                  />
                </div>
                <div className="form-group">
                  <label>تلفن ۲</label>
                  <input
                    name="phone2"
                    value={formData.phone2}
                    onChange={handleChange}
                    placeholder="اختیاری"
                  />
                </div>
                <div className="form-group">
                  <label>تلفن مادر</label>
                  <input
                    name="motherPhone"
                    value={formData.motherPhone}
                    onChange={handleChange}
                    placeholder="09..."
                  />
                </div>
                <div className="form-group">
                  <label>تلفن منزل</label>
                  <input
                    name="homePhone"
                    value={formData.homePhone}
                    onChange={handleChange}
                    placeholder="شماره ثابت"
                  />
                </div>
                <div className="form-group">
                  <label>مدرسه</label>
                  <input
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>معدل</label>
                  <input
                    type="number"
                    name="avg"
                    step="0.01"
                    value={formData.avg}
                    onChange={handleChange}
                    placeholder="مثلاً 18.75"
                  />
                </div>
                <div className="form-group">
                  <label>کد ملی</label>
                  <input
                    name="nationalCode"
                    value={formData.nationalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </>
        )}

        {activeStep === 2 && (
          <div className="next-page">
            <h3>مرحله دوم: شرایط ثبت‌نام</h3>
            <p>در این بخش شرایط و مدارک لازم ثبت‌نام را بررسی کنید.</p>
          </div>
        )}

        {activeStep === 3 && (
          <div className="next-page">
            <h3>مرحله سوم: اطلاعات تکمیلی</h3>
            <p>اطلاعات بیشتر دانش‌آموز مانند سوابق و علاقه‌مندی‌ها.</p>
          </div>
        )}

        {activeStep === 4 && (
          <div className="next-page">
            <h3>مرحله چهارم: مدارک مستند</h3>
            <p>در این مرحله فایل‌های مربوط به مدارک را آپلود کنید.</p>
          </div>
        )}
      </main>

      {/* ===== دکمه‌ها ===== */}
      <div className="button-container">
        <button className="reset-btn" onClick={handleReset}>
          پاک کردن همه
        </button>

        {activeStep > 1 && (
          <button className="back-btn" onClick={handleBack}>
            برگشت
          </button>
        )}

        {activeStep < steps.length && (
          <button className="next-btn" onClick={handleNext}>
            بعدی
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
