import React from "react";

const Validation = ({ 
  formData, 
  errors, 
  setErrors, 
  activeStep, 
  setActiveStep, 
  setExamCount, 
  setExamFeeOption, 
  setInstallments, 
  setInstallmentCount, 
  setInstallmentSupport 
}) => {
  const validateStep1 = () => {
    let newErrors = {};
    const requiredFields = ["code", "date", "name", "family", "grade", "gender", "phone1", "nationalCode"];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "این فیلد الزامی است";
      }
    });

    if (!/^\d{10}$/.test(formData.nationalCode)) {
      newErrors.nationalCode = "کد ملی باید 10 رقم باشد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.typeOption) newErrors.typeOption = "لطفاً نوع ثبت‌نام را انتخاب کنید";
    if (!formData.examCount) newErrors.examCount = "تعداد آزمون باید مشخص شود";
    if (formData.examCount !== "none" && !formData.examFeeOption) newErrors.examFeeOption = "لطفاً شهریه آزمون را انتخاب کنید";
    if (formData.examFeeOption === "custom" && !formData.customExamFee) newErrors.customExamFee = "لطفاً مبلغ دلخواه را وارد کنید";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    let newErrors = {};
    if (!formData.installment) newErrors.installment = "لطفاً وضعیت قسط‌بندی آزمون و کلاس را مشخص کنید";
    if (formData.installment === "بله" && (!formData.installmentCount || formData.installmentCount <= 0)) {
      newErrors.installmentCount = "تعداد اقساط آزمون و کلاس را وارد کنید";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 1 && validateStep1()) {
      setActiveStep(2);
    } else if (activeStep === 2 && validateStep2()) {
      setActiveStep(3);
    } else if (activeStep === 3 && validateStep3()) {
      setActiveStep(4);
    }
  };

  return (
    <div className="validation">
      <button onClick={handleNext}>بعدی</button>
    </div>
  );
};

export default Validation;
