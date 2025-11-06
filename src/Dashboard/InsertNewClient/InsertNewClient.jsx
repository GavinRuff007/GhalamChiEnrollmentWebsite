import React, { useState, useEffect } from "react";
import "./InsertNewClient.css";
import RegistrationInfoStep from "./step2/RegistrationInfoStep.jsx";
import PersonalInfoStep from "./step1/PersonalInfoStep.jsx";
import FeeInfoStep from "./step3/FeeInfoStep";
import DocumentsStep from "./step4/DocumentsStep";


const InsertNewClient = () => {

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
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
        "nationalCode",
      ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "باید پر کنی";
      }
    });

    if (!/^\d{10}$/.test(formData.nationalCode)) {
      newErrors.nationalCode = "کد ملی باید دقیقاً ۱۰ رقم عددی باشد";
    }

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
        <PersonalInfoStep
          formData={formData}
          errors={errors}
          setFormData={setFormData}
          handleChange={handleChange}
          handleGradeChange={handleGradeChange}
        />
      )}

      {/* ================== مرحله دوم ================== */}
      {activeStep === 2 && (
        <RegistrationInfoStep
          typeOption={typeOption}
          setTypeOption={setTypeOption}
          examCount={examCount}
          setExamCount={setExamCount}
          examFeeOption={examFeeOption}
          setExamFeeOption={setExamFeeOption}
          customExamFee={customExamFee}
          setCustomExamFee={setCustomExamFee}
          bookFeeOption={bookFeeOption}
          setBookFeeOption={setBookFeeOption}
          customBookFee={customBookFee}
          setCustomBookFee={setCustomBookFee}
          discountExam={discountExam}
          setDiscountExam={setDiscountExam}
          discountClass={discountClass}
          setDiscountClass={setDiscountClass}
          classCount={classCount}
          classInfo={classInfo}
          handleClassChange={handleClassChange}
          subjectList={subjectList}
          errors={errors}
          specialSupport={specialSupport}
          setSpecialSupport={setSpecialSupport}
          summerSupportFeeOption={summerSupportFeeOption}
          setSummerSupportFeeOption={setSummerSupportFeeOption}
          summerSupportFee={summerSupportFee}
          setSummerSupportFee={setSummerSupportFee}
          fallSupportFeeOption={fallSupportFeeOption}
          setFallSupportFeeOption={setFallSupportFeeOption}
          fallSupportFee={fallSupportFee}
          setFallSupportFee={setFallSupportFee}
          winterSupportFeeOption={winterSupportFeeOption}
          setWinterSupportFeeOption={setWinterSupportFeeOption}
          winterSupportFee={winterSupportFee}
          setWinterSupportFee={setWinterSupportFee}
          springSupportFeeOption={springSupportFeeOption}
          setSpringSupportFeeOption={setSpringSupportFeeOption}
          springSupportFee={springSupportFee}
          setSpringSupportFee={setSpringSupportFee}
          discountSupport={discountSupport}
          setDiscountSupport={setDiscountSupport}
          formData={formData}
          handleChange={handleChange}
        />
      )}




      {/* ================== مرحله سوم ================== */}
      {activeStep === 3 && (
      <FeeInfoStep
        errors={errors}
        installment={installment}
        setInstallment={setInstallment}
        classInitialFee={classInitialFee}
        setClassInitialFee={setClassInitialFee}
        installmentCount={installmentCount}
        setInstallmentCount={setInstallmentCount}
        installments={installments}
        setInstallments={setInstallments}
        specialSupport={specialSupport}
        installmentSupport={installmentSupport}
        setInstallmentSupport={setInstallmentSupport}
        classInitialFeeForSupport={classInitialFeeForSupport}
        setClassInitialFeeForSupport={setClassInitialFeeForSupport}
        installmentCountSupport={installmentCountSupport}
        setInstallmentCountSupport={setInstallmentCountSupport}
        supportInstallments={supportInstallments}
        setSupportInstallments={setSupportInstallments}
      />
    )}


        {/* ================== مرحله چهارم ================== */}
        {activeStep === 4 && (
          <DocumentsStep
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
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

export default InsertNewClient;
