import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { updateRegistrationInfo } from "../../../../slices/formSlice";

const SupportSection = ({ reg, supporters, dispatch }) => {
  const updateSupport = (field, value) => {
    dispatch(
      updateRegistrationInfo({
        supportInfo: { ...reg.supportInfo, [field]: value },
      })
    );
  };

  return (
    <>
      <hr />

      <div className="special-toggle-container">
        <label>پشتیبانی ویژه</label>
        <input
          type="checkbox"
          checked={reg.specialSupport || false}
          onChange={(e) =>
            dispatch(updateRegistrationInfo({ specialSupport: e.target.checked }))
          }
        />
      </div>

      {reg.specialSupport && (
        <>
          <h4>پشتیبانی ویژه</h4>

          <div className="class-row">
            <div className="form-group">
              <label>نام پشتیبان</label>
              <select
                value={reg.supportInfo?.supporterId || ""}
                onChange={(e) => updateSupport("supporterId", e.target.value)}
              >
                <option value="">انتخاب کنید</option>
                {supporters.map((sp) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.fullName} {sp.nationalCode && `- ${sp.nationalCode}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>تاریخ شروع</label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={reg.supportInfo?.startDate || ""}
                onChange={(d) => updateSupport("startDate", d?.format?.("YYYY/MM/DD"))}
                inputClass="custom-input"
              />
            </div>

            <div className="form-group">
              <label>تاریخ پایان</label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={reg.supportInfo?.endDate || ""}
                onChange={(d) => updateSupport("endDate", d?.format?.("YYYY/MM/DD"))}
                inputClass="custom-input"
              />
            </div>

            <div className="support-fee-box">
              <label className="fee-label">شهریه کل:</label>
              <div className="fee-value">
                {(reg.supportInfo?.fee || 0).toLocaleString("fa-IR")} تومان
              </div>

              {reg.supportInfo?.days && (
                <div className="support-days">
                  {reg.supportInfo.days} روز ×{" "}
                  {reg.supportInfo.dailyPrice?.toLocaleString("fa-IR")}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SupportSection;
