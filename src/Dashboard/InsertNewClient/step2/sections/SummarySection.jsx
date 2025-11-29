import React from "react";

const SummarySection = ({ fees }) => {
  return (
    <>
      <hr />
      <h4>خلاصه هزینه‌ها</h4>

      <table className="summary-table">
        <thead>
          <tr>
            <th>شهریه کلاس</th>
            <th>شهریه آزمون</th>
            <th>شهریه کتاب</th>
            <th>پشتیبانی ویژه</th>
            <th>جمع کل</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{fees?.class_fee?.toLocaleString("fa-IR") || "0"}</td>
            <td>{fees?.exam_fee?.toLocaleString("fa-IR") || "0"}</td>
            <td>{fees?.book_fee?.toLocaleString("fa-IR") || "0"}</td>
            <td>{fees?.support_fee?.toLocaleString("fa-IR") || "0"}</td>
            <td className="highlight">
              {fees?.total_fee?.toLocaleString("fa-IR") || "0"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SummarySection;
