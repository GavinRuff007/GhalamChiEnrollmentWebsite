import React, { useState, useEffect } from "react";
import "./DashboardHome.css";

const DashboardHome = () => {
  // ===== مراحل فرم =====
  const steps = [
    { title: "اطلاعات شخص", number: 1 },
    { title: "اطلاعات ثبت‌نام", number: 2 },
    { title: "اطلاعات شهریه", number: 3 },
    { title: "مدارک مستند", number: 4 },
  ];

  // ===== Stateها =====
  const [activeStep, setActiveStep] = useState(1);
  const [specialSupport, setSpecialSupport] = useState(false);
  const [typeOption, setTypeOption] = useState("");
  const [classCount, setClassCount] = useState(0);
  const [classInfo, setClassInfo] = useState([]);
  const [gradeLevel, setGradeLevel] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [installment, setInstallment] = useState("");
  const [classInitialFee, setClassInitialFee] = useState("");
  const [classInitialFeeForSupport, setClassInitialFeeForSupport] = useState("");
  const [installmentSupport, setInstallmentSupport] = useState("");
  const [installments, setInstallments] = useState([]);
  const [installmentCount, setInstallmentCount] = useState("");
  const [installmentCountSupport, setInstallmentCountSupport] = useState("");
  const [supportInstallments, setSupportInstallments] = useState([]);


  // شهریه آزمون و کتاب
  const [examFeeOption, setExamFeeOption] = useState("");
  const [customExamFee, setCustomExamFee] = useState("");
  const [bookFeeOption, setBookFeeOption] = useState("");
  const [customBookFee, setCustomBookFee] = useState("");

  // ===== اطلاعات فرم =====
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
  })

  // ===== محاسبه تعداد کلاس‌ها =====
  useEffect(() => {
    const match = typeOption.match(/^(\d)/);
    const count = match ? parseInt(match[1]) : 0;
    setClassCount(count);
    const updated = Array.from({ length: count }, (_, i) => classInfo[i] || {});
    setClassInfo(updated);
  }, [typeOption]);

  // ===== تغییر اطلاعات کلاس =====
  const handleClassChange = (index, field, value) => {
    const updated = [...classInfo];
    if (!updated[index]) updated[index] = {};
    updated[index][field] = value;
    setClassInfo(updated);
  };

  // ===== تغییر پایه =====
  const handleGradeChange = (gradeValue) => {
    setGradeLevel(gradeValue);

    if (!isNaN(gradeValue) && gradeValue >= 2 && gradeValue <= 9) {
      setSubjectList(["ریاضی", "علوم", "ادبیات"]);
    } else if (
      gradeValue.startsWith("10") ||
      gradeValue.startsWith("11") ||
      gradeValue.startsWith("12")
    ) {
      if (gradeValue.includes("ریاضی"))
        setSubjectList(["حسابان", "فیزیک", "شیمی", "هندسه"]);
      else if (gradeValue.includes("تجربی"))
        setSubjectList(["زیست‌شناسی", "فیزیک", "شیمی", "ریاضی"]);
      else if (gradeValue.includes("انسانی"))
        setSubjectList(["فلسفه", "تاریخ", "جامعه‌شناسی", "ادبیات تخصصی"]);
    } else {
      setSubjectList([]);
    }
  };

  // ===== تغییر مقادیر فرم =====
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ===== ریست فرم =====
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

  // ===== جابه‌جایی مراحل =====
  const handleNext = () => {
    if (activeStep < steps.length) setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  // ============================================================
  //                     ساختار صفحه
  // ============================================================
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
        {/* ================== مرحله اول ================== */}
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
                  <label>پایه تحصیلی</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={(e) => {
                      handleChange(e);
                      handleGradeChange(e.target.value);
                    }}
                  >
                    <option value="">انتخاب کنید</option>

                    <optgroup label="دوره ابتدایی و اول دبیرستان">
                      {[...Array(8)].map((_, i) => (
                        <option key={i + 2} value={i + 2}>
                          پایه {i + 2}
                        </option>
                      ))}
                    </optgroup>

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
                  </select>
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

        {/* ================== مرحله دوم ================== */}
        {activeStep === 2 && (
  <div className="next-page">
    <h3>مرحله دوم: اطلاعات ثبت‌نام</h3>
    <form className="student-form">
      <div className="form-grid">
        {/* ===== نوع ثبت‌نام ===== */}
        <div className="form-group">
          <label>نوع</label>
          <select
            value={typeOption}
            onChange={(e) => setTypeOption(e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            <option value="1">1کلاس</option>
            <option value="2">2کلاس</option>
            <option value="3">3کلاس</option>
            <option value="4">4کلاس</option>
            <option value="آزمون">آزمون</option>
            <option value="1+آزمون">1کلاس+آزمون</option>
            <option value="2+آزمون">2کلاس+آزمون</option>
            <option value="3+آزمون">3کلاس+آزمون</option>
            <option value="4+آزمون">4کلاس+آزمون</option>
          </select>
        </div>

        {/* ===== نام مسئول جذب ===== */}
        <div className="form-group">
          <label>نام مسئول جذب</label>
          <select
            name="recruiter"
            value={formData.recruiter || ""}
            onChange={handleChange}
          >
            <option value="">انتخاب کنید</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={`مسئول ${i + 1}`}>
                مسئول {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* ===== تعداد آزمون ===== */}
        <div className="form-group">
          <label>تعداد آزمون ثبت‌نامی</label>
          <select>
            <option value="">انتخاب کنید</option>
            {[...Array(24)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* ===== شهریه‌ها ===== */}
        <div className="form-group">
          <label>شهریه یک آزمون</label>
          <select
            value={examFeeOption}
            onChange={(e) => setExamFeeOption(e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            <option value="100000">100٬000 تومان</option>
            <option value="200000">200٬000 تومان</option>
            <option value="300000">300٬000 تومان</option>
            <option value="custom">انتخاب مقدار دلخواه</option>
          </select>
          {examFeeOption === "custom" && (
            <input
              type="number"
              placeholder="مقدار دلخواه (تومان)"
              value={customExamFee}
              onChange={(e) => setCustomExamFee(e.target.value)}
              style={{ marginTop: "8px" }}
            />
          )}
        </div>

        <div className="form-group">
          <label>شهریه کتاب</label>
          <select
            value={bookFeeOption}
            onChange={(e) => setBookFeeOption(e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            <option value="50000">50٬000 تومان</option>
            <option value="100000">100٬000 تومان</option>
            <option value="150000">150٬000 تومان</option>
            <option value="custom">انتخاب مقدار دلخواه</option>
          </select>
          {bookFeeOption === "custom" && (
            <input
              type="number"
              placeholder="مقدار دلخواه (تومان)"
              value={customBookFee}
              onChange={(e) => setCustomBookFee(e.target.value)}
              style={{ marginTop: "8px" }}
            />
          )}
        </div>

        <div className="form-group">
          <label>تخفیف آزمون (تومان)</label>
          <input type="number" placeholder="مبلغ تخفیف آزمون" />
        </div>

        <div className="form-group">
          <label>تخفیف کلاس (تومان)</label>
          <input type="number" placeholder="مبلغ تخفیف کلاس" />
        </div>
      </div>

      {/* ===== کلاس‌ها ===== */}
      {classCount > 0 && (
        <>
          <hr />
          <h4 style={{ marginBottom: "10px" }}>کلاس‌ها</h4>
          <div className="form-grid">
            {Array.from({ length: classCount }).map((_, index) => (
              <React.Fragment key={index}>
                <div className="form-group">
                  <label>نام کلاس {index + 1}</label>
                  {subjectList.length > 0 ? (
                    <select
                      value={classInfo[index]?.name || ""}
                      onChange={(e) =>
                        handleClassChange(index, "name", e.target.value)
                      }
                    >
                      <option value="">انتخاب کنید</option>
                      {subjectList.map((subj, idx) => (
                        <option key={idx} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={`نام کلاس ${index + 1}`}
                      value={classInfo[index]?.name || ""}
                      onChange={(e) =>
                        handleClassChange(index, "name", e.target.value)
                      }
                    />
                  )}
                </div>

                <div className="form-group">
                  <label>شهریه کلاس {index + 1}</label>
                  <select
                    value={classInfo[index]?.feeOption || ""}
                    onChange={(e) =>
                      handleClassChange(index, "feeOption", e.target.value)
                    }
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="200000">200٬000 تومان</option>
                    <option value="300000">300٬000 تومان</option>
                    <option value="400000">400٬000 تومان</option>
                    <option value="custom">انتخاب مقدار دلخواه</option>
                  </select>

                  {classInfo[index]?.feeOption === "custom" && (
                    <input
                      type="number"
                      placeholder="مقدار دلخواه (تومان)"
                      value={classInfo[index]?.customFee || ""}
                      onChange={(e) =>
                        handleClassChange(index, "customFee", e.target.value)
                      }
                      style={{ marginTop: "8px" }}
                    />
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {/* ===== پشتیبان ویژه ===== */}
      <hr />
      <div className="special-toggle-container">
        <div className="toggle-right">
          <label style={{ fontWeight: "bold", marginLeft: "10px" }}>
            متقاضی خواستار پشتیبانی ویژه است
          </label>
          <input
            type="checkbox"
            checked={specialSupport}
            onChange={(e) => setSpecialSupport(e.target.checked)}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>
      </div>

      <div
        className="form-grid"
        style={{
          opacity: specialSupport ? 1 : 0.5,
          transition: "0.3s ease",
        }}
      >
        <div className="form-group">
          <label>نام پشتیبان ویژه</label>
          <input
            type="text"
            placeholder="نام پشتیبان"
            disabled={!specialSupport}
          />
        </div>

        <div className="form-group">
          <label>شهریه پشتیبان ویژه تابستان 404</label>
          <input
            type="number"
            placeholder="مبلغ به تومان"
            disabled={!specialSupport}
          />
        </div>

        <div className="form-group">
          <label>شهریه پشتیبان ویژه پاییز 404</label>
          <input
            type="number"
            placeholder="مبلغ به تومان"
            disabled={!specialSupport}
          />
        </div>

        <div className="form-group">
          <label>شهریه پشتیبان ویژه زمستان 404</label>
          <input
            type="number"
            placeholder="مبلغ به تومان"
            disabled={!specialSupport}
          />
        </div>

        <div className="form-group">
          <label>شهریه پشتیبان ویژه بهار 405</label>
          <input
            type="number"
            placeholder="مبلغ به تومان"
            disabled={!specialSupport}
          />
        </div>

        <div className="form-group">
          <label>تخفیف پشتیبان ویژه (تومان)</label>
          <input
            type="number"
            placeholder="مبلغ تخفیف پشتیبان ویژه"
            disabled={!specialSupport}
          />
        </div>
      </div>

      {/* ===== خط جداکننده و توضیحات مشتری ===== */}
      <hr style={{ margin: "30px 0", border: "1px solid #ccc" }} />
      <div className="form-group" style={{ width: "100%" }}>
        <label>توضیحات مشتری</label>
        <textarea
          rows="4"
          placeholder="توضیحات یا یادداشت‌های مشتری را وارد کنید..."
          style={{
            width: "100%",
            resize: "vertical",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontFamily: "inherit",
          }}
        />
      </div>
    </form>
  </div>
)}


       {activeStep === 3 && (
  <div className="next-page" id="fee-info-section">
    <h3>مرحله سوم: اطلاعات شهریه</h3>

    <form className="student-form">
      <div className="form-grid">
        {/* ===== مبلغ اولیه آزمون کلاس ===== */}
        <div className="form-group" style={{ width: "250px" }}>
          <label>مبلغ اولیه آزمون کلاس (تومان)</label>
          <input
            type="number"
            placeholder="مثلاً 500٬000 تومان"
            value={installment === "خیر" ? 9200000 : classInitialFee}
            disabled={installment === "خیر"}
            onChange={(e) => setClassInitialFee(e.target.value)}
          />
        </div>

        {/* ===== انتخاب قسط‌بندی آزمون و کلاس ===== */}
        <div className="form-group" style={{ width: "250px" }}>
          <label>ایجاد قسط‌بندی برای آزمون و کلاس</label>
          <select
            value={installment}
            onChange={(e) => {
              const value = e.target.value;
              setInstallment(value);
              if (value === "خیر") {
                setClassInitialFee(9200000);
                setInstallmentCount("");
                setInstallments([]);
              } else {
                setClassInitialFee("");
              }
            }}
          >
            <option value="">انتخاب کنید</option>
            <option value="بله">بله</option>
            <option value="خیر">خیر</option>
          </select>
        </div>

        {/* ===== نمایش لیست تعداد اقساط آزمون و کلاس ===== */}
        {installment === "بله" && (
          <div className="form-group" style={{ width: "250px" }}>
            <label>تعداد اقساط آزمون و کلاس</label>
            <select
              value={installmentCount}
              onChange={(e) => {
                const count = parseInt(e.target.value);
                setInstallmentCount(count);
                setInstallments(
                  Array.from({ length: count }, () => ({
                    feeOption: "",
                    customFee: "",
                    date: "",
                  }))
                );
              }}
            >
              <option value="">انتخاب کنید</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} قسط
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ===== پشتیبان ویژه ===== */}
        {specialSupport && (
          <>
            {/* مبلغ اولیه پشتیبانی ویژه */}
            <div className="form-group" style={{ width: "250px" }}>
              <label>مبلغ اولیه آزمون پشتیبان ویژه (تومان)</label>
              <input
                type="number"
                placeholder="مثلاً 700٬000 تومان"
                value={
                  installmentSupport === "خیر"
                    ? 8900000
                    : classInitialFeeForSupport
                }
                disabled={installmentSupport === "خیر"}
                onChange={(e) => setClassInitialFeeForSupport(e.target.value)}
              />
            </div>

            {/* انتخاب قسط‌بندی پشتیبانی ویژه */}
            <div className="form-group" style={{ width: "250px" }}>
              <label>ایجاد قسط‌بندی برای پشتیبانی</label>
              <select
                value={installmentSupport}
                onChange={(e) => {
                  const value = e.target.value;
                  setInstallmentSupport(value);
                  if (value === "خیر") {
                    setClassInitialFeeForSupport(8900000);
                    setInstallmentCountSupport("");
                    setSupportInstallments([]);
                  } else {
                    setClassInitialFeeForSupport("");
                  }
                }}
              >
                <option value="">انتخاب کنید</option>
                <option value="بله">بله</option>
                <option value="خیر">خیر</option>
              </select>
            </div>

            {/* ===== نمایش لیست تعداد اقساط پشتیبانی ویژه ===== */}
            {installmentSupport === "بله" && (
              <div className="form-group" style={{ width: "250px" }}>
                <label>تعداد اقساط پشتیبانی ویژه</label>
                <select
                  value={installmentCountSupport}
                  onChange={(e) => {
                    const count = parseInt(e.target.value);
                    setInstallmentCountSupport(count);
                    setSupportInstallments(
                      Array.from({ length: count }, () => ({
                        feeOption: "",
                        customFee: "",
                        date: "",
                      }))
                    );
                  }}
                >
                  <option value="">انتخاب کنید</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} قسط
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
      </div>

      {/* ===== خط جداکننده ===== */}
      <hr style={{ margin: "30px 0", border: "1px solid #ccc" }} />

      {/* ===== ساخت فیلدهای قسط‌بندی آزمون و کلاس ===== */}
      {installment === "بله" && installmentCount > 0 && (
        <div
          className="installment-list"
          style={{
            display: "flex",
            flexDirection: "row", // ✅ افقی کنار هم
            flexWrap: "wrap",
            gap: "20px",
            direction: "rtl",
            justifyContent: "flex-start",
          }}
        >
          <h4 style={{ width: "100%", marginBottom: "10px" }}>
            جزئیات اقساط آزمون و کلاس
          </h4>

          {Array.from({ length: installmentCount }).map((_, i) => (
            <div
              key={i}
              className="installment-item"
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                width: "280px",
                background: "#f9f9f9",
              }}
            >
              <h5 style={{ marginBottom: "10px" }}>قسط {i + 1}</h5>

              {/* مبلغ قسط */}
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <label>مبلغ قسط</label>
                <select
                  value={installments[i]?.feeOption || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const updated = [...installments];
                    updated[i].feeOption = value;
                    if (value !== "custom") updated[i].customFee = "";
                    setInstallments(updated);
                  }}
                >
                  <option value="">انتخاب کنید</option>
                  {[100000, 200000, 300000, 400000, 500000].map((amt) => (
                    <option key={amt} value={amt}>
                      {amt.toLocaleString()} تومان
                    </option>
                  ))}
                  <option value="custom">مقدار دلخواه</option>
                </select>

                {installments[i]?.feeOption === "custom" && (
                  <input
                    type="number"
                    placeholder="مقدار دلخواه (تومان)"
                    value={installments[i]?.customFee || ""}
                    onChange={(e) => {
                      const updated = [...installments];
                      updated[i].customFee = e.target.value;
                      setInstallments(updated);
                    }}
                    style={{ marginTop: "8px" }}
                  />
                )}
              </div>

              {/* تاریخ قسط */}
              <div className="form-group">
                <label>تاریخ قسط</label>
                <input
                  type="date"
                  dir="rtl"
                  value={installments[i]?.date || ""}
                  onChange={(e) => {
                    const updated = [...installments];
                    updated[i].date = e.target.value;
                    setInstallments(updated);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== خط جداکننده دوم (برای پشتیبانی ویژه) ===== */}
      {specialSupport && <hr style={{ margin: "30px 0", border: "1px solid #ccc" }} />}

      {/* ===== ساخت فیلدهای قسط‌بندی پشتیبانی ویژه ===== */}
      {specialSupport &&
        installmentSupport === "بله" &&
        installmentCountSupport > 0 && (
          <div
            className="installment-list"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
              direction: "rtl",
              justifyContent: "flex-start",
            }}
          >
            <h4 style={{ width: "100%", marginBottom: "10px" }}>
              جزئیات اقساط پشتیبانی ویژه
            </h4>

            {Array.from({ length: installmentCountSupport }).map((_, i) => (
              <div
                key={i}
                className="installment-item"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  width: "280px",
                  background: "#f9f9f9",
                }}
              >
                <h5 style={{ marginBottom: "10px" }}>قسط {i + 1}</h5>

                {/* مبلغ قسط */}
                <div className="form-group" style={{ marginBottom: "10px" }}>
                  <label>مبلغ قسط</label>
                  <select
                    value={supportInstallments[i]?.feeOption || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      const updated = [...supportInstallments];
                      updated[i].feeOption = value;
                      if (value !== "custom") updated[i].customFee = "";
                      setSupportInstallments(updated);
                    }}
                  >
                    <option value="">انتخاب کنید</option>
                    {[100000, 200000, 300000, 400000, 500000].map((amt) => (
                      <option key={amt} value={amt}>
                        {amt.toLocaleString()} تومان
                      </option>
                    ))}
                    <option value="custom">مقدار دلخواه</option>
                  </select>

                  {supportInstallments[i]?.feeOption === "custom" && (
                    <input
                      type="number"
                      placeholder="مقدار دلخواه (تومان)"
                      value={supportInstallments[i]?.customFee || ""}
                      onChange={(e) => {
                        const updated = [...supportInstallments];
                        updated[i].customFee = e.target.value;
                        setSupportInstallments(updated);
                      }}
                      style={{ marginTop: "8px" }}
                    />
                  )}
                </div>

                {/* تاریخ قسط */}
                <div className="form-group">
                  <label>تاریخ قسط</label>
                  <input
                    type="date"
                    dir="rtl"
                    value={supportInstallments[i]?.date || ""}
                    onChange={(e) => {
                      const updated = [...supportInstallments];
                      updated[i].date = e.target.value;
                      setSupportInstallments(updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
    </form>
  </div>
)}








        {/* ================== مرحله چهارم ================== */}
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
