import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { formatNumber } from "../utils/formatNumber";

const PaymentItem = ({ p, index, updatePayment }) => {
  return (
    <div className="payment-box">
      <h4>روش پرداخت {index + 1}</h4>

      {/* نوع پرداخت */}
      <div className="form-group">
        <label>نوع پرداخت</label>
        <select
          value={p.type}
          onChange={(e) => updatePayment(index, "type", e.target.value)}
        >
          <option value="">انتخاب کنید</option>
          <option value="پرداخت نقدی">پرداخت نقدی</option>
          <option value="چک">چک</option>
          <option value="امانی">امانی</option>
          <option value="قسط">قسط</option>
        </select>
      </div>

      {/* مبلغ */}
      <div className="form-group">
        <label>مبلغ (تومان)</label>
        <input
          type="text"
          value={formatNumber(p.amount)}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, "").replace(/\D/g, "");
            updatePayment(index, "amount", raw);
          }}
          placeholder="مثلاً 2,000,000"
        />
      </div>

      {/* تاریخ‌ها */}
      {p.type !== "" && p.type !== "پرداخت نقدی" && (
        <>
          <div className="form-group">
            <label>تاریخ شروع</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={p.startDate}
              onChange={(d) =>
                updatePayment(index, "startDate", d?.format("YYYY/MM/DD"))
              }
              inputClass="custom-input"
              placeholder="انتخاب تاریخ شروع"
            />
          </div>

          <div className="form-group">
            <label>تاریخ پایان</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={p.endDate}
              onChange={(d) =>
                updatePayment(index, "endDate", d?.format("YYYY/MM/DD"))
              }
              inputClass="custom-input"
              placeholder="انتخاب تاریخ پایان"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentItem;
