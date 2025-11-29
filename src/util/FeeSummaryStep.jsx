import React, { useEffect, useState } from "react";
import api from "../api/Interceptor"; // مسیر را مطابق پروژه خود تنظیم کن

const FeeSummaryStep = ({
  typeOption,
  examCount,
  discountExam,
  discountClass,
  classCount,
  bookVoucher,
  specialSupport,
}) => {
  const [fees, setFees] = useState(null);

  // ----------------------------
  //  استایل هدر و سلول جدول
  // ----------------------------
  const thStyle = {
    border: "2px solid #555",
    padding: "10px",
    background: "#f0f0f0",
    fontWeight: "bold",
    textAlign: "center",
  };

  const tdStyle = {
    border: "2px solid #555",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
  };

  // ----------------------------
  //  دریافت هزینه‌ها از سرور
  // ----------------------------
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await api.post("/api/fees/calculate", {
          typeOption,
          examCount,
          discountExam,
          discountClass,
          classCount,
          bookVoucher,
          specialSupport,
        });

        setFees(response.data);
      } catch (err) {
        console.error("❌ Error fetching fee summary:", err);
      }
    };

    fetchFees();
  }, [
    typeOption,
    examCount,
    discountExam,
    discountClass,
    classCount,
    bookVoucher,
    specialSupport,
  ]);

  // ----------------------------
  //  اگر هنوز داده نیامده
  // ----------------------------
  if (!fees) return <p>در حال محاسبه هزینه‌ها...</p>;

  // ----------------------------
  //  نمایش خلاصه هزینه‌ها
  // ----------------------------
  return (
    <div className="next-page">
      <h3 style={{ marginBottom: "15px" }}>مرحله سوم: جمع‌بندی هزینه‌ها</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          fontSize: "18px",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>شهریه کلاس</th>
            <th style={thStyle}>شهریه آزمون</th>
            <th style={thStyle}>شهریه کتاب</th>
            <th style={thStyle}>پشتیبانی ویژه</th>
            <th style={thStyle}>جمع کل</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={tdStyle}>{(fees.class_fee || 0).toLocaleString()}</td>
            <td style={tdStyle}>{(fees.exam_fee || 0).toLocaleString()}</td>
            <td style={tdStyle}>{(fees.book_fee || 0).toLocaleString()}</td>
            <td style={tdStyle}>{(fees.support_fee || 0).toLocaleString()}</td>
            <td style={{ ...tdStyle, background: "#ffe3b3" }}>
              {(fees.total_fee || 0).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FeeSummaryStep;
