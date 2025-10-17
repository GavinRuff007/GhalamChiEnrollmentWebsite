import React, { useState, useEffect } from "react";
import "./DashboardHome.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DashboardHome = () => {

  // ===== مراحل فرم =====
  const steps = [
    { title: "اطلاعات شخص", number: 1 },
    { title: "اطلاعات ثبت‌نام", number: 2 },
    { title: "اطلاعات شهریه", number: 3 },
    { title: "مدارک مستند", number: 4 },
    { title: "تایید ثبت نام", number: 5}
  ];

  // ===== Stateها =====
  const [examCount, setExamCount] = useState("");
  const [errors, setErrors] = useState({});
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
  const [discountExam, setDiscountExam] = useState("");
  const [discountClass, setDiscountClass] = useState("");
  const [summerSupportFeeOption, setSummerSupportFeeOption] = useState("");
  const [summerSupportFee, setSummerSupportFee] = useState("");
  const [fallSupportFeeOption, setFallSupportFeeOption] = useState("");
  const [fallSupportFee, setFallSupportFee] = useState("");
  const [winterSupportFeeOption, setWinterSupportFeeOption] = useState("");
  const [winterSupportFee, setWinterSupportFee] = useState("");
  const [springSupportFeeOption, setSpringSupportFeeOption] = useState("");
  const [springSupportFee, setSpringSupportFee] = useState("");
  const [discountSupport, setDiscountSupport] = useState("");
  const [examFeeOption, setExamFeeOption] = useState("");
  const [customExamFee, setCustomExamFee] = useState("");
  const [bookFeeOption, setBookFeeOption] = useState("");
  const [customBookFee, setCustomBookFee] = useState("");
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

  const validateStep3 = () => {
  const newErrors = {};

  if (!installment) {
    newErrors.installment = "لطفاً وضعیت قسط‌بندی آزمون و کلاس را مشخص کنید.";
  }

  if (specialSupport) {
    if (!installmentSupport) {
      newErrors.installmentSupport = "لطفاً وضعیت قسط‌بندی پشتیبانی را انتخاب کنید";
      }
  }


  if (installment === "بله") {
    if (!installmentCount || installmentCount <= 0) {
      newErrors.installmentCount = "تعداد اقساط آزمون و کلاس را وارد کنید.";
    } else {
      installments.forEach((inst, i) => {
        if (!inst.feeOption && !inst.customFee)
          newErrors[`installment_fee_${i}`] = `مبلغ قسط ${i + 1} را وارد کنید.`;
        if (!inst.date)
          newErrors[`installment_date_${i}`] = `تاریخ قسط ${i + 1} را مشخص کنید.`;
      });
    }
  }

  if (specialSupport && installmentSupport === "بله") {
    if (!installmentCountSupport || installmentCountSupport <= 0) {
      newErrors.installmentCountSupport = "تعداد اقساط پشتیبانی ویژه را وارد کنید.";
    } else {
      supportInstallments.forEach((inst, i) => {
        if (!inst.feeOption && !inst.customFee)
          newErrors[`support_fee_${i}`] = `مبلغ قسط پشتیبانی ${i + 1} را وارد کنید.`;
        if (!inst.date)
          newErrors[`support_date_${i}`] = `تاریخ قسط پشتیبانی ${i + 1} را مشخص کنید.`;
      });
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  // ===== تغییر مقادیر فرم =====
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ===== ریست فرم =====
  const handleReset = () => {
  if (activeStep === 1) {
    // 🔹 مرحله اول: اطلاعات شخصی
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
  } 
  
  else if (activeStep === 2) {
    // 🔹 مرحله دوم: اطلاعات ثبت‌نام
    setTypeOption("");
    setExamCount("");
    setExamFeeOption("");
    setCustomExamFee("");
    setBookFeeOption("");
    setCustomBookFee("");
    setClassCount(0);
    setClassInfo([]);
    setSpecialSupport(false);
    setErrors({});
  } 
  
  else if (activeStep === 3) {
    // 🔹 مرحله سوم: اطلاعات شهریه
    setClassInitialFee("");
    setInstallment("");
    setInstallmentCount("");
    setInstallments([]);
    setClassInitialFeeForSupport("");
    setInstallmentSupport("");
    setInstallmentCountSupport("");
    setSupportInstallments([]);
    setErrors({});
  }

  // پیام بازخورد (اختیاری)
  alert("اطلاعات این مرحله پاک شد ✅");
};


  // ===== جابه‌جایی مراحل =====
  // ===== جابه‌جایی مراحل =====
const handleNext = () => {
  let newErrors = {};

  // ============================
  // 🔹 مرحله اول: اطلاعات شخصی
  // ============================
  if (activeStep === 1) {
    const requiredFields = [
      "code",
      "date",
      "name",
      "family",
      "grade",
      "gender",
      "phone1",
      "motherPhone",
      "homePhone",
      "school",
      "avg",
      "nationalCode",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "باید پر کنی";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("لطفاً فیلدهای قرمز را پر کنید");
      return;
    }
  }

  // ============================
  // 🔹 مرحله دوم: اطلاعات ثبت‌نام
  // ============================
  if (activeStep === 2) {
    newErrors = {};

    // فیلدهای پایه
    if (!typeOption) newErrors.typeOption = "باید پر کنی";
    if (!examCount) newErrors.examCount = "باید پر کنی";

    // اگر آزمون دارد (یعنی examCount !== "none")، باید شهریه آزمون مشخص باشد
    if (examCount !== "none" && !examFeeOption) {
      newErrors.examFeeOption = "لطفاً شهریه یک آزمون را انتخاب کنید";
    }

    // اگر مقدار دلخواه انتخاب شده ولی عددی وارد نشده باشد
    if (examFeeOption === "custom" && !customExamFee) {
      newErrors.customExamFee = "لطفاً مبلغ دلخواه را وارد کنید";
    }

    // 🔹 بررسی کلاس‌ها (در صورت وجود)
    if (classCount > 0) {
      classInfo.forEach((cls, index) => {
        if (!cls.name || cls.name.trim() === "")
          newErrors[`class_name_${index}`] = "نام کلاس را وارد کن";
        if (!cls.feeOption)
          newErrors[`class_fee_${index}`] = "شهریه کلاس را انتخاب کن";
        if (cls.feeOption === "custom" && !cls.customFee)
          newErrors[`class_fee_${index}`] = "مقدار دلخواه را وارد کن";
      });
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("لطفاً فیلدهای قرمز را پر کنید");
      return;
    }
  }

  // ============================
  // 🔹 مرحله سوم: اطلاعات شهریه
  // ============================
  if (activeStep === 3) {
    if (!validateStep3()) {
      alert("لطفاً تمام فیلدهای الزامی در مرحله سوم را تکمیل کنید.");
      return;
    }
  }

  // ============================
  // 🔹 جابه‌جایی بین مراحل
  // ============================
  setErrors({});
  setActiveStep((prev) => Math.min(prev + 1, steps.length));
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
        {/* ===== کد مالی ===== */}
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

        {/* ===== تاریخ ثبت‌نام ===== */}
<div className="form-group">
  <label>تاریخ ثبت‌نام <span style={{ color: "red" }}>*</span></label>
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
    inputClass="custom-input" // ✅ اضافه شد برای هماهنگی با بقیه
    containerStyle={{ width: "100%" }}
    placeholder="تاریخ را انتخاب کنید"
  />
  {errors.date && <span className="error-text">{errors.date}</span>}
</div>



        {/* ===== نام ===== */}
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

        {/* ===== نام خانوادگی ===== */}
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

        {/* ===== پایه تحصیلی ===== */}
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
          {errors.grade && <span className="error-text">{errors.grade}</span>}
        </div>

        {/* ===== جنسیت ===== */}
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

        {/* ===== تلفن دانش‌آموز ===== */}
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

        {/* ===== تلفن ۲ (اختیاری) ===== */}
        <div className="form-group">
          <label>تلفن ۲</label>
          <input
            name="phone2"
            value={formData.phone2}
            onChange={handleChange}
            placeholder="اختیاری"
          />
        </div>

        {/* ===== تلفن مادر ===== */}
        <div className="form-group">
          <label>تلفن مادر <span style={{ color: "red" }}>*</span></label>
          <input
            name="motherPhone"
            value={formData.motherPhone}
            onChange={handleChange}
            placeholder="09..."
            className={errors.motherPhone ? "error" : ""}
          />
          {errors.motherPhone && (
            <span className="error-text">{errors.motherPhone}</span>
          )}
        </div>

        {/* ===== تلفن منزل ===== */}
        <div className="form-group">
          <label>تلفن منزل <span style={{ color: "red" }}>*</span></label>
          <input
            name="homePhone"
            value={formData.homePhone}
            onChange={handleChange}
            placeholder="شماره ثابت"
            className={errors.homePhone ? "error" : ""}
          />
          {errors.homePhone && (
            <span className="error-text">{errors.homePhone}</span>
          )}
        </div>

        {/* ===== مدرسه ===== */}
        <div className="form-group">
          <label>مدرسه <span style={{ color: "red" }}>*</span></label>
          <input
            name="school"
            value={formData.school}
            onChange={handleChange}
            className={errors.school ? "error" : ""}
          />
          {errors.school && <span className="error-text">{errors.school}</span>}
        </div>

        {/* ===== معدل ===== */}
        <div className="form-group">
          <label>معدل <span style={{ color: "red" }}>*</span></label>
          <input
            type="number"
            name="avg"
            step="0.01"
            value={formData.avg}
            onChange={handleChange}
            placeholder="مثلاً 18.75"
            className={errors.avg ? "error" : ""}
          />
          {errors.avg && <span className="error-text">{errors.avg}</span>}
        </div>

        {/* ===== کد ملی ===== */}
        <div className="form-group">
          <label>کد ملی <span style={{ color: "red" }}>*</span></label>
          <input
            name="nationalCode"
            value={formData.nationalCode}
            onChange={handleChange}
            className={errors.nationalCode ? "error" : ""}
          />
          {errors.nationalCode && (
            <span className="error-text">{errors.nationalCode}</span>
          )}
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
          <label>نوع <span style={{ color: "red" }}>*</span></label>
          <select
            value={typeOption}
            onChange={(e) => {
              const value = e.target.value;
              setTypeOption(value);

              // ✅ اگر فقط کلاس انتخاب شد (بدون آزمون)
              if (["1", "2", "3", "4"].includes(value)) {
                setExamCount("none"); // نمایش آزمون ندارد
                setExamFeeOption("0"); // شهریه صفر
              } else {
                setExamCount("");
                setExamFeeOption("");
              }
            }}
            className={errors.typeOption ? "error" : ""}
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
          {errors.typeOption && (
            <span className="error-text">{errors.typeOption}</span>
          )}
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

        {/* ===== تعداد آزمون ثبت‌نامی ===== */}
        <div className="form-group">
          <label>تعداد آزمون ثبت‌نامی <span style={{ color: "red" }}>*</span></label>
          <select
            value={examCount}
            onChange={(e) => setExamCount(e.target.value)}
            disabled={["1", "2", "3", "4"].includes(typeOption)}
            className={errors.examCount ? "error" : ""}
          >
            <option value="">انتخاب کنید</option>
            <option value="none">آزمون ندارد</option>
            {[...Array(24)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {errors.examCount && (
            <span className="error-text">{errors.examCount}</span>
          )}
        </div>

        {/* ===== شهریه یک آزمون ===== */}
        <div className="form-group">
          <label>شهریه یک آزمون <span style={{ color: "red" }}>*</span></label>
          <select
            value={examCount === "none" ? "0" : examFeeOption}
            disabled={examCount === "none"}
            onChange={(e) => setExamFeeOption(e.target.value)}
            className={errors.examFeeOption ? "error" : ""}
          >
            {examCount === "none" ? (
              <option value="0">0 تومان</option>
            ) : (
              <>
                <option value="">انتخاب کنید</option>
                <option value="100000">100٬000 تومان</option>
                <option value="200000">200٬000 تومان</option>
                <option value="300000">300٬000 تومان</option>
                <option value="custom">انتخاب مقدار دلخواه</option>
              </>
            )}
          </select>
          {examFeeOption === "custom" && examCount !== "none" && (
            <input
              type="text"
              placeholder="مقدار دلخواه (تومان)"
              value={customExamFee ? customExamFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, ""); // حذف ویرگول و غیر عددی
                setCustomExamFee(rawValue);
              }}
              style={{ marginTop: "8px" }}
            />
          )}
          {errors.examFeeOption && (
            <span className="error-text">{errors.examFeeOption}</span>
          )}
        </div>

        {/* ===== شهریه کتاب ===== */}
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
      type="text"
      placeholder="مقدار دلخواه (تومان)"
      value={customBookFee ? customBookFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
      onChange={(e) => {
        const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
        setCustomBookFee(rawValue);
      }}
      style={{ marginTop: "8px" }}
    />
  )}
</div>


        {/* ===== تخفیف‌ها ===== */}
        <div className="form-group">
        <label>تخفیف آزمون (تومان)</label>
        <input
          type="text"
          placeholder="مبلغ تخفیف آزمون"
          value={discountExam ? discountExam.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, ""); // حذف ویرگول‌ها
            setDiscountExam(rawValue); // مقدار عددی واقعی در state ذخیره می‌شود
          }}
        />
      </div>


        <div className="form-group">
  <label>تخفیف کلاس (تومان)</label>
  <input
    type="text"
    placeholder="مبلغ تخفیف کلاس"
    value={discountClass ? discountClass.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
    onChange={(e) => {
      const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
      setDiscountClass(rawValue);
    }}
  />
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
          {/* ===== نام کلاس ===== */}
          <div className="form-group">
            <label>نام کلاس {index + 1} <span style={{ color: "red" }}>*</span></label>
            {subjectList.length > 0 ? (
              <select
                value={classInfo[index]?.name || ""}
                onChange={(e) =>
                  handleClassChange(index, "name", e.target.value)
                }
                className={errors[`class_name_${index}`] ? "error" : ""}
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
                className={errors[`class_name_${index}`] ? "error" : ""}
              />
            )}
            {errors[`class_name_${index}`] && (
              <span className="error-text">
                {errors[`class_name_${index}`]}
              </span>
            )}
          </div>

          {/* ===== شهریه کلاس ===== */}
          <div className="form-group">
            <label>شهریه کلاس {index + 1} <span style={{ color: "red" }}>*</span></label>
            <select
              value={classInfo[index]?.feeOption || ""}
              onChange={(e) =>
                handleClassChange(index, "feeOption", e.target.value)
              }
              className={errors[`class_fee_${index}`] ? "error" : ""}
            >
              <option value="">انتخاب کنید</option>
              <option value="200000">200٬000 تومان</option>
              <option value="300000">300٬000 تومان</option>
              <option value="400000">400٬000 تومان</option>
              <option value="custom">انتخاب مقدار دلخواه</option>
            </select>

            {classInfo[index]?.feeOption === "custom" && (
              <input
                type="text"
                placeholder="مقدار دلخواه (تومان)"
                value={
                  classInfo[index]?.customFee
                    ? classInfo[index].customFee.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )
                    : ""
                }
                onChange={(e) => {
                  const rawValue = e.target.value
                    .replace(/,/g, "")
                    .replace(/\D/g, "");
                  handleClassChange(index, "customFee", rawValue);
                }}
                style={{ marginTop: "8px" }}
                className={errors[`class_fee_${index}`] ? "error" : ""}
              />
            )}
            {errors[`class_fee_${index}`] && (
              <span className="error-text">
                {errors[`class_fee_${index}`]}
              </span>
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

        {/* ===== پشتیبان ویژه ===== */}
<div className="form-group">
  <label>شهریه پشتیبان ویژه تابستان 404</label>
  <select
    value={summerSupportFeeOption}
    onChange={(e) => setSummerSupportFeeOption(e.target.value)}
    disabled={!specialSupport}
  >
    <option value="">انتخاب کنید</option>
    <option value="1000000">1٬000٬000 تومان</option>
    <option value="2000000">2٬000٬000 تومان</option>
    <option value="3000000">3٬000٬000 تومان</option>
    <option value="custom">انتخاب مقدار دلخواه</option>
  </select>

  {summerSupportFeeOption === "custom" && (
    <input
      type="text"
      placeholder="مقدار دلخواه (تومان)"
      disabled={!specialSupport}
      value={
        summerSupportFee
          ? summerSupportFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : ""
      }
      onChange={(e) => {
        const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
        setSummerSupportFee(rawValue);
      }}
      style={{ marginTop: "8px" }}
    />
  )}
</div>

<div className="form-group">
  <label>شهریه پشتیبان ویژه پاییز 404</label>
  <select
    value={fallSupportFeeOption}
    onChange={(e) => setFallSupportFeeOption(e.target.value)}
    disabled={!specialSupport}
  >
    <option value="">انتخاب کنید</option>
    <option value="1000000">1٬000٬000 تومان</option>
    <option value="2000000">2٬000٬000 تومان</option>
    <option value="3000000">3٬000٬000 تومان</option>
    <option value="custom">انتخاب مقدار دلخواه</option>
  </select>

  {fallSupportFeeOption === "custom" && (
    <input
      type="text"
      placeholder="مقدار دلخواه (تومان)"
      disabled={!specialSupport}
      value={
        fallSupportFee
          ? fallSupportFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : ""
      }
      onChange={(e) => {
        const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
        setFallSupportFee(rawValue);
      }}
      style={{ marginTop: "8px" }}
    />
  )}
</div>

<div className="form-group">
  <label>شهریه پشتیبان ویژه زمستان 404</label>
  <select
    value={winterSupportFeeOption}
    onChange={(e) => setWinterSupportFeeOption(e.target.value)}
    disabled={!specialSupport}
  >
    <option value="">انتخاب کنید</option>
    <option value="1000000">1٬000٬000 تومان</option>
    <option value="2000000">2٬000٬000 تومان</option>
    <option value="3000000">3٬000٬000 تومان</option>
    <option value="custom">انتخاب مقدار دلخواه</option>
  </select>

  {winterSupportFeeOption === "custom" && (
    <input
      type="text"
      placeholder="مقدار دلخواه (تومان)"
      disabled={!specialSupport}
      value={
        winterSupportFee
          ? winterSupportFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : ""
      }
      onChange={(e) => {
        const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
        setWinterSupportFee(rawValue);
      }}
      style={{ marginTop: "8px" }}
    />
  )}
</div>

<div className="form-group">
  <label>شهریه پشتیبان ویژه بهار 405</label>
  <select
    value={springSupportFeeOption}
    onChange={(e) => setSpringSupportFeeOption(e.target.value)}
    disabled={!specialSupport}
  >
    <option value="">انتخاب کنید</option>
    <option value="1000000">1٬000٬000 تومان</option>
    <option value="2000000">2٬000٬000 تومان</option>
    <option value="3000000">3٬000٬000 تومان</option>
    <option value="custom">انتخاب مقدار دلخواه</option>
  </select>

  {springSupportFeeOption === "custom" && (
    <input
      type="text"
      placeholder="مقدار دلخواه (تومان)"
      disabled={!specialSupport}
      value={
        springSupportFee
          ? springSupportFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : ""
      }
      onChange={(e) => {
        const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
        setSpringSupportFee(rawValue);
      }}
      style={{ marginTop: "8px" }}
    />
  )}
</div>

<div className="form-group">
  <label>تخفیف پشتیبان ویژه (تومان)</label>
  <input
    type="text"
    placeholder="مبلغ تخفیف پشتیبان ویژه"
    disabled={!specialSupport}
    value={
      discountSupport ? discountSupport.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
    }
    onChange={(e) => {
      const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
      setDiscountSupport(rawValue);
    }}
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
            type="text"
            placeholder="مثلاً 500,000 تومان"
            value={
              installment === "خیر"
                ? "9,200,000"
                : classInitialFee
                ? classInitialFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : ""
            }
            disabled={installment === "خیر"}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, ""); // فقط عدد بدون ویرگول
              setClassInitialFee(rawValue);
            }}
            className={errors.classInitialFee ? "error" : ""}
          />
          {errors.classInitialFee && (
            <span className="error-text">{errors.classInitialFee}</span>
          )}
        </div>


        {/* ===== انتخاب قسط‌بندی آزمون و کلاس ===== */}
        <div className="form-group" style={{ width: "250px" }}>
          <label>ایجاد قسط‌بندی برای آزمون و کلاس <span style={{ color: "red" }}>*</span></label>
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
            className={errors.installment ? "error" : ""}
          >
            <option value="">انتخاب کنید</option>
            <option value="بله">بله</option>
            <option value="خیر">خیر</option>
          </select>
          {errors.installment && (
            <span className="error-text">{errors.installment}</span>
          )}
        </div>

        {/* ===== نمایش لیست تعداد اقساط آزمون و کلاس ===== */}
        {installment === "بله" && (
          <div className="form-group" style={{ width: "250px" }}>
            <label>تعداد اقساط آزمون و کلاس <span style={{ color: "red" }}>*</span></label>
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
              className={errors.installmentCount ? "error" : ""}
            >
              <option value="">انتخاب کنید</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} قسط
                </option>
              ))}
            </select>
            {errors.installmentCount && (
              <span className="error-text">{errors.installmentCount}</span>
            )}
          </div>
        )}

        {/* ===== پشتیبان ویژه ===== */}
        {specialSupport && (
          <>
            {/* مبلغ اولیه پشتیبانی ویژه */}
<div className="form-group" style={{ width: "250px" }}>
  <label>مبلغ اولیه آزمون پشتیبان ویژه (تومان)</label>
  <input
    type="text"
    placeholder="مثلاً 700,000 تومان"
    value={
      installmentSupport === "خیر"
        ? "8,900,000"
        : classInitialFeeForSupport
        ? classInitialFeeForSupport.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : ""
    }
    disabled={installmentSupport === "خیر"}
    onChange={(e) => {
      const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
      setClassInitialFeeForSupport(rawValue);
    }}
    className={errors.classInitialFeeForSupport ? "error" : ""}
  />
  {errors.classInitialFeeForSupport && (
    <span className="error-text">
      {errors.classInitialFeeForSupport}
    </span>
  )}
</div>

            {/* انتخاب قسط‌بندی پشتیبانی ویژه */}
            {specialSupport && (
              <div className="form-group" style={{ width: "250px" }}>
                <label>
                  ایجاد قسط‌بندی برای پشتیبانی{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
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
                  className={errors.installmentSupport ? "error" : ""}
                >
                  <option value="">انتخاب کنید</option>
                  <option value="بله">بله</option>
                  <option value="خیر">خیر</option>
                </select>

                {errors.installmentSupport && (
                  <span className="error-text">{errors.installmentSupport}</span>
                )}
              </div>
            )}


            {/* ===== نمایش لیست تعداد اقساط پشتیبانی ویژه ===== */}
            {installmentSupport === "بله" && (
              <div className="form-group" style={{ width: "250px" }}>
                <label>تعداد اقساط پشتیبانی ویژه <span style={{ color: "red" }}>*</span></label>
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
                  className={errors.installmentCountSupport ? "error" : ""}
                >
                  <option value="">انتخاب کنید</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} قسط
                    </option>
                  ))}
                </select>
                {errors.installmentCountSupport && (
                  <span className="error-text">
                    {errors.installmentCountSupport}
                  </span>
                )}
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
            flexDirection: "row",
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
                className={errors[`installment_fee_${i}`] ? "error" : ""}
              >
                <option value="">انتخاب کنید</option>
                {[100000, 200000, 300000, 400000, 500000].map((amt) => (
                  <option key={amt} value={amt}>
                    {amt.toLocaleString()} تومان
                  </option>
                ))}
                <option value="custom">مقدار دلخواه</option>
              </select>

              {/* ===== فیلد مقدار دلخواه ===== */}
              {installments[i]?.feeOption === "custom" && (
                <input
                  type="text"
                  placeholder="مقدار دلخواه (تومان)"
                  value={
                    installments[i]?.customFee
                      ? installments[i].customFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""
                  }
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, ""); // فقط عدد بدون ویرگول
                    const updated = [...installments];
                    updated[i].customFee = rawValue;
                    setInstallments(updated);
                  }}
                  style={{ marginTop: "8px" }}
                />
              )}

              {errors[`installment_fee_${i}`] && (
                <span className="error-text">{errors[`installment_fee_${i}`]}</span>
              )}
            </div>


              {/* تاریخ قسط */}
<div className="form-group">
  <label>تاریخ قسط</label>
  <DatePicker
    calendar={persian}
    locale={persian_fa}
    value={installments[i]?.date || ""}
    onChange={(date) => {
      const updated = [...installments];
      updated[i].date = date?.format?.("YYYY/MM/DD") || "";
      setInstallments(updated);
    }}
    inputClass="custom-input" // ✅ همان استایل مثل سایر inputها
    containerStyle={{ width: "100%" }}
    placeholder="تاریخ قسط را انتخاب کنید"
  />
  {errors[`installment_date_${i}`] && (
    <span className="error-text">
      {errors[`installment_date_${i}`]}
    </span>
  )}
</div>

            </div>
          ))}
        </div>
      )}

      {/* ===== خط جداکننده دوم (برای پشتیبانی ویژه) ===== */}
      {specialSupport && (
        <hr style={{ margin: "30px 0", border: "1px solid #ccc" }} />
      )}

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
                    className={errors[`support_fee_${i}`] ? "error" : ""}
                  >
                    <option value="">انتخاب کنید</option>
                    {[100000, 200000, 300000, 400000, 500000].map((amt) => (
                      <option key={amt} value={amt}>
                        {amt.toLocaleString()} تومان
                      </option>
                    ))}
                    <option value="custom">مقدار دلخواه</option>
                  </select>

                  {/* ===== فیلد مقدار دلخواه ===== */}
                  {supportInstallments[i]?.feeOption === "custom" && (
                    <input
                      type="text"
                      placeholder="مقدار دلخواه (تومان)"
                      value={
                        supportInstallments[i]?.customFee
                          ? supportInstallments[i].customFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, ""); // فقط عدد
                        const updated = [...supportInstallments];
                        updated[i].customFee = rawValue;
                        setSupportInstallments(updated);
                      }}
                      style={{ marginTop: "8px" }}
                    />
                  )}

                  {errors[`support_fee_${i}`] && (
                    <span className="error-text">{errors[`support_fee_${i}`]}</span>
                  )}
                </div>


                {/* تاریخ قسط (شمسی) */}
                <div className="form-group">
                  <label>تاریخ قسط</label>
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    inputClass="form-control"
                    containerStyle={{ width: "100%" }}
                    value={supportInstallments[i]?.date || ""}
                    onChange={(date) => {
                      const formattedDate = date?.format("YYYY/MM/DD") || "";
                      const updated = [...supportInstallments];
                      updated[i].date = formattedDate;
                      setSupportInstallments(updated);
                    }}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      direction: "rtl",
                      border: errors[`support_date_${i}`] ? "1px solid red" : "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "8px",
                    }}
                    placeholder="انتخاب تاریخ قسط"
                  />
                  {errors[`support_date_${i}`] && (
                    <span className="error-text">{errors[`support_date_${i}`]}</span>
                  )}
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

  {activeStep < steps.length ? (
    <button className="next-btn" onClick={handleNext}>
      بعدی
    </button>
  ) : (
    <button
      className="confirm-btn"
      style={{
        backgroundColor: "#52c41a",
        color: "white",
        fontWeight: "bold",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
      onClick={() => {
        alert("✅ اطلاعات با موفقیت ثبت شد!");

        // 🧹 پاک‌سازی همه داده‌ها
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
        setTypeOption("");
        setExamCount("");
        setExamFeeOption("");
        setCustomExamFee("");
        setBookFeeOption("");
        setCustomBookFee("");
        setClassCount(0);
        setClassInfo([]);
        setSpecialSupport(false);
        setClassInitialFee("");
        setInstallment("");
        setInstallmentCount("");
        setInstallments([]);
        setClassInitialFeeForSupport("");
        setInstallmentSupport("");
        setInstallmentCountSupport("");
        setSupportInstallments([]);
        setErrors({});

        // 🔁 بازگشت به مرحله اول
        setActiveStep(1);
      }}
    >
      تأیید نهایی
    </button>
  )}
</div>
</div>
  );
};

export default DashboardHome;
