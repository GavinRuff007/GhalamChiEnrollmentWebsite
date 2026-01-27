import React, { useEffect, useMemo } from "react";
import "./InsertNewClient.css";
import cleanStep3Data from "./utils/cleanStep3Data";
import FinalReviewStep from "./step5/FinalReviewStep";
import { useParams, useLocation } from "react-router-dom";



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
  useGetStep3Query,
} from "../../services/apiSlice";

const InsertNewClient = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const { nationalCode: routeNationalCode } = useParams();
  const isEditMode = Boolean(routeNationalCode);

  const { activeStep, personalInfo, registrationInfo, feeInfo, errors } =
    useSelector((state) => state.form);

  const nationalCode = useMemo(() => {
    return isEditMode ? routeNationalCode : personalInfo?.nationalCode;
  }, [isEditMode, routeNationalCode, personalInfo?.nationalCode]);

  const steps = [
    { title: "اطلاعات شخص", number: 1 },
    { title: "اطلاعات ثبت‌نام", number: 2 },
    { title: "اطلاعات شهریه", number: 3 },
    { title: "مدارک مستند", number: 4 },
    { title: "تایید ثبت نام", number: 5 },
  ];

  const [saveStep1] = useSaveStep1Mutation();
  const [saveStep2] = useSaveStep2Mutation();
  const [saveStep3] = useSaveStep3Mutation();

  const { data: serverStep1 } = useGetStep1Query(routeNationalCode, {
    skip: !isEditMode,
  });

  const { data: serverStep2 } = useGetStep2Query(routeNationalCode, {
    skip: !isEditMode,
  });

  const { data: serverStep3 } = useGetStep3Query(routeNationalCode, {
    skip: !isEditMode,
  });


  useEffect(() => {
    if (isEditMode) return; 

    const savedPersonal = localStorage.getItem("personalInfo");
    const savedReg = localStorage.getItem("registrationInfo");
    const savedFee = localStorage.getItem("feeInfo");

    if (savedPersonal) dispatch(updatePersonalInfo(JSON.parse(savedPersonal)));
    if (savedReg) dispatch(updateRegistrationInfo(JSON.parse(savedReg)));
    if (savedFee) dispatch(updateFeeInfo(JSON.parse(savedFee)));
  }, [dispatch, isEditMode]);

  useEffect(() => {

  if (location.pathname === "/dashboard" || location.pathname === "/adminDashboard") {
    dispatch(resetForm());
    dispatch(clearErrors());
    dispatch(setActiveStep(1));

    localStorage.removeItem("personalInfo");
    localStorage.removeItem("registrationInfo");
    localStorage.removeItem("feeInfo");
  }
}, [location.pathname, dispatch]);

  useEffect(() => {
    if (!isEditMode) return;

    dispatch(resetForm());
    dispatch(clearErrors());
    dispatch(setActiveStep(1));

    localStorage.removeItem("personalInfo");
    localStorage.removeItem("registrationInfo");
    localStorage.removeItem("feeInfo");
  }, [dispatch, isEditMode, routeNationalCode]);


  useEffect(() => {
    if (!isEditMode) return;
    if (!serverStep1) return;

    dispatch(updatePersonalInfo(serverStep1));
    localStorage.setItem("personalInfo", JSON.stringify(serverStep1));
  }, [isEditMode, serverStep1, dispatch]);

  useEffect(() => {
    if (!isEditMode) return;
    if (!serverStep2) return;

    dispatch(updateRegistrationInfo(serverStep2));
    localStorage.setItem("registrationInfo", JSON.stringify(serverStep2));
  }, [isEditMode, serverStep2, dispatch]);

  useEffect(() => {
    if (!isEditMode) return;
    if (!serverStep3) return;

    dispatch(updateFeeInfo(serverStep3));
    localStorage.setItem("feeInfo", JSON.stringify(serverStep3));
  }, [isEditMode, serverStep3, dispatch]);


  useEffect(() => {
    if (!isEditMode) return;

    if (serverStep1 && !serverStep2 && !serverStep3) {
      dispatch(setActiveStep(2));
      return;
    }

    if (serverStep2 && !serverStep3) {
      dispatch(setActiveStep(3));
      return;
    }

    if (serverStep3) {
      dispatch(setActiveStep(4));
      return;
    }

    dispatch(setActiveStep(1));
  }, [isEditMode, serverStep1, serverStep2, serverStep3, dispatch]);


  const handleNext = async () => {
    let newErrors = {};

    if (activeStep === 1) {
      const required = [
        "code",
        "date",
        "name",
        "family",
        "grade",
        "gender",
        "phone1",
        "nationalCode",
      ];

      required.forEach((f) => {
        if (!personalInfo?.[f] || String(personalInfo[f]).trim() === "") {
          newErrors[f] = "پر کردن الزامی است";
        }
      });

      if (!/^\d{10}$/.test(String(personalInfo?.nationalCode || ""))) {
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

    if (activeStep === 2) {
      const { typeOption, examCount } = registrationInfo || {};

      if (!typeOption) newErrors.typeOption = "نوع انتخاب نشده";
      if (!examCount) newErrors.examCount = "تعداد آزمون لازم است";

      dispatch(setErrors(newErrors));
      if (Object.keys(newErrors).length > 0) return;

      localStorage.setItem("registrationInfo", JSON.stringify(registrationInfo));

      const payload = {
        nationalCode: nationalCode, 
        typeOption: registrationInfo?.typeOption ?? null,
        recruiter: registrationInfo?.recruiter ?? null,
        examCount: registrationInfo?.examCount ?? null,
        bookVoucher: registrationInfo?.bookVoucher ?? null,
        discountExam: Number(registrationInfo?.discountExam) || 0,
        discountClass: Number(registrationInfo?.discountClass) || 0,
        classCount: registrationInfo?.classCount ?? 0,
        specialSupport: registrationInfo?.specialSupport ?? false,
        supporterId: registrationInfo?.supportInfo?.supporterId || null,
        supportStart: registrationInfo?.supportInfo?.startDate || null,
        supportEnd: registrationInfo?.supportInfo?.endDate || null,
        supportDays: registrationInfo?.supportInfo?.days || 0,
        supportDailyPrice: registrationInfo?.supportInfo?.dailyPrice || 0,
        supportFee: registrationInfo?.supportInfo?.fee || 0,
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

    if (activeStep === 3) {
      dispatch(setErrors(newErrors));
      if (Object.keys(newErrors).length > 0) return;

      const cleaned = cleanStep3Data(feeInfo, nationalCode); // ✅ کد ملی درست

      localStorage.setItem("feeInfo", JSON.stringify(cleaned));
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

    if (activeStep === 4) {
      dispatch(setActiveStep(5));
      return;
    }
  };


  const handleBack = () => {
    if (activeStep > 1) dispatch(setActiveStep(activeStep - 1));
  };


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
              <div
                className={`circle ${
                  step.number <= activeStep ? "active" : ""
                }`}
              >
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
        {activeStep === 5 && <FinalReviewStep />}
      </main>

      <div className="button-container">
        <button className="reset-btn" onClick={handleReset}>
          ریست
        </button>
        {activeStep > 1 && (
          <button className="back-btn" onClick={handleBack}>
            برگشت
          </button>
        )}
        <button className="next-btn" onClick={handleNext}>
          {activeStep < 5 ? "بعدی" : "تأیید نهایی"}
        </button>
      </div>
    </div>
  );
};

export default InsertNewClient;
