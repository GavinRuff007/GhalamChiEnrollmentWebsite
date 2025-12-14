import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetRecordsQuery } from "../../services/apiSlice";
import "./Records.css";

const Records = () => {
  const { data: records = [], isLoading } = useGetRecordsQuery();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/adminDashboard");

  const filtered = records.filter(
    (r) =>
      r.nationalCode?.includes(search) ||
      `${r.name} ${r.family}`.includes(search)
  );

  const handleContinue = (r) => {
    const base = isAdmin ? "/adminDashboard" : "/dashboard";
    navigate(`${base}/edit/${r.nationalCode}`);
  };

  return (
    <div className="records-page">
      <h2 className="records-title">متقاضیان ثبت‌نام‌شده</h2>

      {/* 🔍 Search */}
      <div className="records-header">
        <div className="search-box">
          <input
            type="text"
            placeholder="جستجو با کد ملی یا نام"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="search-btn">🔍</button>
        </div>
      </div>

      {/* 📦 Records */}
      <div className="records-container">
        {isLoading && <p>در حال بارگذاری...</p>}

        {!isLoading && filtered.length === 0 && (
          <p className="empty">موردی یافت نشد</p>
        )}

        {filtered.map((r) => (
          <details
            key={r.id}
            className={`record-item ${
              r.completedSteps === 3 ? "completed" : "incomplete"
            }`}
          >
            <summary>
              <div>
                <strong>{r.name} {r.family}</strong>
                <span>کد ملی: {r.nationalCode}</span>
              </div>

              {r.completedSteps === 3 ? (
                <span className="badge success">تکمیل شده</span>
              ) : (
                <span className="badge warning">تکمیل نشده</span>
              )}
            </summary>

            <div className="record-details">
              <p>📞 موبایل: {r.mobileNumber || "-"}</p>
              <p>📊 مراحل تکمیل‌شده: {r.completedSteps}</p>

              <button
                className="continue-btn"
                onClick={() => handleContinue(r)}
              >
                ادامه / ویرایش ثبت‌نام
              </button>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default Records;
