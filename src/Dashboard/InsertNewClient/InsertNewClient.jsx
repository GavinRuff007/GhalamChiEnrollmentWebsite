import React, { useEffect } from "react";
import "./InsertNewClient.css";
import cleanStep3Data  from "./utils/cleanStep3Data";

import { useSelector, useDispatch } from "react-redux";
import {
  setActiveStep,
  resetForm,
  updatePersonalInfo,
  updateRegistrationInfo,
  updateFeeInfo,
  setErrors,
  clearErrors,
} from "../../slices/formSlice";

import PersonalInfoStep from "./step1/PersonalInfoStep";
import RegistrationInfoStep from "./step2/RegistrationInfoStep";
import FeeInfoStep from "./step3/FeeInfoStep";
import DocumentsStep from "./step4/DocumentsStep";

import {
  useSaveStep1Mutation,
  useSaveStep2Mutation,
  useSaveStep3Mutation,
  useGetStep1Query,
  useGetStep2Query,
} from "../../services/apiSlice";

const InsertNewClient = () => {
  const dispatch = useDispatch();

  const {
    activeStep,
    personalInfo,
    registrationInfo,
    feeInfo,
    errors,
  } = useSelector((state) => state.form);

  const steps = [
    { title: "اطلاعات شخص", number: 1 },
    { title: "اطلاعات ثبت‌نام", number: 2 },
    { title: "اطلاعات شهریه", number: 3 },
    { title: "مدارک مستند", number: 4 },
    { title: "تایید ثبت نام", number: 5 },
  ];

  // --------------------- API HOOKS ------------------------
  const [saveStep1] = useSaveStep1Mutation();
  const [saveStep2] = useSaveStep2Mutation();
  const [saveStep3] = useSaveStep3Mutation();

  const { data: serverStep1 } = useGetStep1Query(
    personalInfo.nationalCode,
    { skip: !personalInfo.nationalCode }
  );

  const { data: serverStep2 } = useGetStep2Query(
    personalInfo.nationalCode,
    { skip: !personalInfo.nationalCode }
  );

  // ===============================================================
  // 🌟 بارگذاری اولیه از localStorage
  // ===============================================================
  useEffect(() => {
    const savedPersonal = localStorage.getItem("personalInfo");
    const savedReg = localStorage.getItem("registrationInfo");
    const savedFee = localStorage.getItem("feeInfo");

    if (savedPersonal) dispatch(updatePersonalInfo(JSON.parse(savedPersonal)));
    if (savedReg) dispatch(updateRegistrationInfo(JSON.parse(savedReg)));
    if (savedFee) dispatch(updateFeeInfo(JSON.parse(savedFee)));
  }, [dispatch]);

  // ===============================================================
  // 🌟 اگر Step1 از سرور آمد → پر کن
  // ===============================================================
  useEffect(() => {
    if (serverStep1) {
      dispatch(updatePersonalInfo(serverStep1));
      localStorage.setItem("personalInfo", JSON.stringify(serverStep1));
    }
  }, [serverStep1, dispatch]);

  // ===============================================================
  // 🌟 اگر Step2 از سرور آمد → فقط در صورت نبود localStorage
  // ===============================================================
  useEffect(() => {
    if (!serverStep2) return;

    const savedReg = localStorage.getItem("registrationInfo");

    // فقط وقتی قبلاً ذخیره نشده، با دیتا سرور مقدار بده
    if (!savedReg) {
      dispatch(updateRegistrationInfo(serverStep2));
      localStorage.setItem("registrationInfo", JSON.stringify(serverStep2));
    }
  }, [serverStep2, dispatch]);

  // ===============================================================
  // دکمه "بعدی"
  // ===============================================================
  const handleNext = async () => {
    let newErrors = {};

    // ------------------- Step 1 -------------------
    if (activeStep === 1) {
      const required = [
        "code", "date", "name", "family",
        "grade", "gender", "phone1", "nationalCode",
      ];

      required.forEach((f) => {
        if (!personalInfo[f] || personalInfo[f].trim() === "") {
          newErrors[f] = "پر کردن الزامی است";
        }
      });

      if (!/^\d{10}$/.test(personalInfo.nationalCode)) {
        newErrors.nationalCode = "کد ملی باید ۱۰ رقم باشد";
      }

      dispatch(setErrors(newErrors));
      if (Object.keys(newErrors).length > 0) return;

      localStorage.setItem("personalInfo", JSON.stringify(personalInfo));

      try {
        await saveStep1(personalInfo).unwrap();
      } catch (err) {
        console.error("❌ Error saving step1:", err);
        alert("خطا در ذخیره اطلاعات مرحله اول");
        return;
      }

      dispatch(clearErrors());
      dispatch(setActiveStep(2));
      return;
    }

    // ------------------- Step 2 -------------------
    if (activeStep === 2) {
      const { typeOption, examCount } = registrationInfo;

      if (!typeOption) newErrors.typeOption = "نوع انتخاب نشده";
      if (!examCount) newErrors.examCount = "تعداد آزمون لازم است";

      dispatch(setErrors(newErrors));
      if (Object.keys(newErrors).length > 0) return;

      localStorage.setItem("registrationInfo", JSON.stringify(registrationInfo));
      console.log("SENDING STEP2:", registrationInfo);

      const payload = {
        nationalCode: personalInfo.nationalCode,
        typeOption: registrationInfo.typeOption,
        recruiter: registrationInfo.recruiter,
        examCount: registrationInfo.examCount,
        bookVoucher: registrationInfo.bookVoucher,
        discountExam: Number(registrationInfo.discountExam) || 0,
        discountClass: Number(registrationInfo.discountClass) || 0,
        classCount: registrationInfo.classCount,
        specialSupport: registrationInfo.specialSupport,
        supporterId: registrationInfo.supportInfo?.supporterId || null,
        supportStart: registrationInfo.supportInfo?.startDate || null,
        supportEnd: registrationInfo.supportInfo?.endDate || null,
        supportDays: registrationInfo.supportInfo?.days || 0,
        supportDailyPrice: registrationInfo.supportInfo?.dailyPrice || 0,
        supportFee: registrationInfo.supportInfo?.fee || 0,
      };

      try {
        await saveStep2(payload).unwrap();
      } catch (err) {
        console.error("❌ Error saving step2:", err);
        alert("خطا در ذخیره اطلاعات مرحله دوم");
        return;
      }

      dispatch(clearErrors());
      dispatch(setActiveStep(3));
      return;
    }

    // ------------------- Step 3 -------------------
   if (activeStep === 3) {

  dispatch(setErrors(newErrors));
  if (Object.keys(newErrors).length > 0) return;

  const cleaned = cleanStep3Data(feeInfo, personalInfo.nationalCode);

  console.log("SENDING STEP3:", cleaned);

  try {
    await saveStep3(cleaned).unwrap();
  } catch (err) {
    console.error("❌ Error saving step3:", err);
    alert("خطا در ذخیره اطلاعات مرحله شهریه");
    return;
  }

  dispatch(clearErrors());
  dispatch(setActiveStep(4));
  return;
}
  }


  // ===============================================================
  // دکمه "برگشت"
  // ===============================================================
  const handleBack = () => {
    if (activeStep > 1) dispatch(setActiveStep(activeStep - 1));
  };

  // ===============================================================
  // دکمه "ریست"
  // ===============================================================
  const handleReset = () => {
    dispatch(resetForm());

    localStorage.removeItem("personalInfo");
    localStorage.removeItem("registrationInfo");
    localStorage.removeItem("feeInfo");

    alert("فرم پاک شد");
  };

  return (
    <div className="dashboard-home">

      <header className="dashboard-header">
        <div className="process-container">
          {steps.map((step, i) => (
            <div key={i} className="process-step">
              <div className={`circle ${step.number <= activeStep ? "active" : ""}`}>
                {step.number}
              </div>
              <div className="label">{step.title}</div>
              {i < steps.length - 1 && <div className="line" />}
            </div>
          ))}
        </div>
      </header>

      <main className="dashboard-content">
        {activeStep === 1 && <PersonalInfoStep errors={errors} />}
        {activeStep === 2 && <RegistrationInfoStep errors={errors} />}
        {activeStep === 3 && <FeeInfoStep errors={errors} fees={feeInfo} />}
        {activeStep === 4 && <DocumentsStep />}
        {activeStep === 5 && <h1>✔ ثبت نهایی انجام شد</h1>}
      </main>

      <div className="button-container">
        <button className="reset-btn" onClick={handleReset}>ریست</button>
        {activeStep > 1 && <button className="back-btn" onClick={handleBack}>برگشت</button>}
        <button className="next-btn" onClick={handleNext}>
          {activeStep < 5 ? "بعدی" : "تأیید نهایی"}
        </button>
      </div>
    </div>
  );
};

export default InsertNewClient;
