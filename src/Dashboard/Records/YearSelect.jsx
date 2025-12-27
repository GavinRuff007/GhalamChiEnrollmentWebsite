import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetRecordsQuery } from "../../services/apiSlice";
import "./YearSelect.css";

// تبدیل میلادی به سال تحصیلی شمسی (بدون کتابخانه)
const getAcademicYear = (createdAt) => {
  const date = new Date(createdAt);

  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;

  // تقریب سال شمسی
  const jy = gy - 621;

  // مهر ≈ اکتبر
  if (gm >= 10) {
    return `${jy + 1}–${jy + 2}`;
  }

  return `${jy}–${jy + 1}`;
};

const YearSelect = () => {
  const { data: records = [], isLoading } = useGetRecordsQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/adminDashboard");

  const years = Array.from(
    new Set(
      records
        .filter((r) => r.createdAt)
        .map((r) => getAcademicYear(r.createdAt))
    )
  ).sort((a, b) => b.localeCompare(a));

  const handleSelectYear = (year) => {
    const base = isAdmin ? "/adminDashboard" : "/dashboard";
    navigate(`${base}/records/${year}`);
  };

  return (
    <div className="year-wrapper-top">
      <div className="year-box">
        <h3 className="year-title">انتخاب سال ثبت‌نام</h3>

        {isLoading && <p className="year-loading">در حال بارگذاری...</p>}

        {!isLoading && (
          <div className="year-links">
            {years.map((y) => (
              <span
                key={y}
                className="year-link"
                onClick={() => handleSelectYear(y)}
              >
                {y}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YearSelect;
