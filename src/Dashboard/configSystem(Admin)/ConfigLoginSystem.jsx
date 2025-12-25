import React from "react";
import RecruiterConfigSection from "./RecruiterConfigSection";
import "./ConfigLoginSystem.css";

const ConfigLoginSystem = () => {
  return (
    <div className="config-container">
      <h2 className="title">تنظیمات سیستم ثبت‌نام</h2>

      {/* بخش مسئول جذب */}
      <RecruiterConfigSection />

      {/* اینجا بعداً می‌توانی بخش‌های تنظیماتی دیگر اضافه کنی */}
      {/* <OtherConfigSection /> */}
    </div>
  );
};

export default ConfigLoginSystem;
