import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const FeeInfoStep = ({
  errors,
  installment,
  setInstallment,
  classInitialFee,
  setClassInitialFee,
  installmentCount,
  setInstallmentCount,
  installments,
  setInstallments,
  specialSupport,
  installmentSupport,
  setInstallmentSupport,
  classInitialFeeForSupport,
  setClassInitialFeeForSupport,
  installmentCountSupport,
  setInstallmentCountSupport,
  supportInstallments,
  setSupportInstallments,
}) => {
  return (
    <div className="next-page" id="fee-info-section">
      <h3>مرحله سوم: اطلاعات شهریه</h3>

      <form className="student-form">
        <div className="form-grid">
          {/* مبلغ اولیه آزمون و کلاس */}
          <div className="form-group" style={{ width: "250px" }}>
            <label>مبلغ اولیه آزمون و کلاس (تومان)</label>
            <input
              type="text"
              placeholder="مثلاً 500,000 تومان"
              value={
                installment === "خیر"
                  ? "9,200,000"
                  : classInitialFee
                  ? classInitialFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""
              }
              disabled={installment === "خیر"}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
                setClassInitialFee(rawValue);
              }}
              className={errors.classInitialFee ? "error" : ""}
            />
            {errors.classInitialFee && (
              <span className="error-text">{errors.classInitialFee}</span>
            )}
          </div>

          {/* انتخاب قسط‌بندی آزمون و کلاس */}
          <div className="form-group" style={{ width: "250px" }}>
            <label>
              ایجاد قسط‌بندی برای آزمون و کلاس{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={installment}
              onChange={(e) => {
                const value = e.target.value;
                setInstallment(value);
                if (value === "خیر") {
                  setClassInitialFee(9200000);
                  setInstallmentCount("");
                  setInstallments([]);
                } else {
                  setClassInitialFee("");
                }
              }}
              className={errors.installment ? "error" : ""}
            >
              <option value="">انتخاب کنید</option>
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
            </select>
            {errors.installment && (
              <span className="error-text">{errors.installment}</span>
            )}
          </div>

          {/* تعداد اقساط آزمون و کلاس */}
          {installment === "بله" && (
            <div className="form-group" style={{ width: "250px" }}>
              <label>
                تعداد اقساط آزمون و کلاس{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={installmentCount}
                onChange={(e) => {
                  const count = parseInt(e.target.value);
                  setInstallmentCount(count);
                  setInstallments(
                    Array.from({ length: count }, () => ({
                      feeOption: "",
                      customFee: "",
                      date: "",
                    }))
                  );
                }}
                className={errors.installmentCount ? "error" : ""}
              >
                <option value="">انتخاب کنید</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} قسط
                  </option>
                ))}
              </select>
              {errors.installmentCount && (
                <span className="error-text">{errors.installmentCount}</span>
              )}
            </div>
          )}

          {/* اگر پشتیبانی ویژه فعال است */}
          {specialSupport && (
            <>
              <div className="form-group" style={{ width: "250px" }}>
                <label>مبلغ اولیه آزمون پشتیبان ویژه (تومان)</label>
                <input
                  type="text"
                  placeholder="مثلاً 700,000 تومان"
                  value={
                    installmentSupport === "خیر"
                      ? "8,900,000"
                      : classInitialFeeForSupport
                      ? classInitialFeeForSupport.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : ""
                  }
                  disabled={installmentSupport === "خیر"}
                  onChange={(e) => {
                    const rawValue = e.target.value
                      .replace(/,/g, "")
                      .replace(/\D/g, "");
                    setClassInitialFeeForSupport(rawValue);
                  }}
                  className={errors.classInitialFeeForSupport ? "error" : ""}
                />
                {errors.classInitialFeeForSupport && (
                  <span className="error-text">
                    {errors.classInitialFeeForSupport}
                  </span>
                )}
              </div>

              <div className="form-group" style={{ width: "250px" }}>
                <label>
                  ایجاد قسط‌بندی برای پشتیبانی{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  value={installmentSupport}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInstallmentSupport(value);
                    if (value === "خیر") {
                      setClassInitialFeeForSupport(8900000);
                      setInstallmentCountSupport("");
                      setSupportInstallments([]);
                    } else {
                      setClassInitialFeeForSupport("");
                    }
                  }}
                  className={errors.installmentSupport ? "error" : ""}
                >
                  <option value="">انتخاب کنید</option>
                  <option value="بله">بله</option>
                  <option value="خیر">خیر</option>
                </select>
                {errors.installmentSupport && (
                  <span className="error-text">
                    {errors.installmentSupport}
                  </span>
                )}
              </div>

              {installmentSupport === "بله" && (
                <div className="form-group" style={{ width: "250px" }}>
                  <label>
                    تعداد اقساط پشتیبانی ویژه{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    value={installmentCountSupport}
                    onChange={(e) => {
                      const count = parseInt(e.target.value);
                      setInstallmentCountSupport(count);
                      setSupportInstallments(
                        Array.from({ length: count }, () => ({
                          feeOption: "",
                          customFee: "",
                          date: "",
                        }))
                      );
                    }}
                    className={errors.installmentCountSupport ? "error" : ""}
                  >
                    <option value="">انتخاب کنید</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} قسط
                      </option>
                    ))}
                  </select>
                  {errors.installmentCountSupport && (
                    <span className="error-text">
                      {errors.installmentCountSupport}
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <hr style={{ margin: "30px 0", border: "1px solid #ccc" }} />

        {/* فیلدهای اقساط آزمون و کلاس */}
        {installment === "بله" &&
          installmentCount > 0 &&
          installments.map((inst, i) => (
            <div
              key={i}
              className="installment-item"
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
              }}
            >
              <h5>قسط {i + 1}</h5>
              <div className="form-group">
                <label>مبلغ قسط</label>
                <select
                  value={inst.feeOption}
                  onChange={(e) => {
                    const val = e.target.value;
                    const updated = [...installments];
                    updated[i].feeOption = val;
                    if (val !== "custom") updated[i].customFee = "";
                    setInstallments(updated);
                  }}
                >
                  <option value="">انتخاب کنید</option>
                  {[100000, 200000, 300000, 400000, 500000].map((amt) => (
                    <option key={amt} value={amt}>
                      {amt.toLocaleString()} تومان
                    </option>
                  ))}
                  <option value="custom">مقدار دلخواه</option>
                </select>

                {inst.feeOption === "custom" && (
                  <input
                    type="text"
                    placeholder="مقدار دلخواه (تومان)"
                    value={
                      inst.customFee
                        ? inst.customFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : ""
                    }
                    onChange={(e) => {
                      const raw = e.target.value
                        .replace(/,/g, "")
                        .replace(/\D/g, "");
                      const updated = [...installments];
                      updated[i].customFee = raw;
                      setInstallments(updated);
                    }}
                    style={{ marginTop: "8px" }}
                  />
                )}
              </div>

              <div className="form-group">
                <label>تاریخ قسط</label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={inst.date}
                  onChange={(date) => {
                    const updated = [...installments];
                    updated[i].date = date?.format?.("YYYY/MM/DD") || "";
                    setInstallments(updated);
                  }}
                  inputClass="custom-input"
                  containerStyle={{ width: "100%" }}
                  placeholder="تاریخ قسط را انتخاب کنید"
                />
              </div>
            </div>
          ))}

        {/* فیلدهای اقساط پشتیبانی ویژه */}
        {specialSupport &&
          installmentSupport === "بله" &&
          supportInstallments.map((inst, i) => (
            <div
              key={i}
              className="installment-item"
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
              }}
            >
              <h5>قسط پشتیبانی {i + 1}</h5>
              <div className="form-group">
                <label>مبلغ قسط</label>
                <select
                  value={inst.feeOption}
                  onChange={(e) => {
                    const val = e.target.value;
                    const updated = [...supportInstallments];
                    updated[i].feeOption = val;
                    if (val !== "custom") updated[i].customFee = "";
                    setSupportInstallments(updated);
                  }}
                >
                  <option value="">انتخاب کنید</option>
                  {[100000, 200000, 300000, 400000, 500000].map((amt) => (
                    <option key={amt} value={amt}>
                      {amt.toLocaleString()} تومان
                    </option>
                  ))}
                  <option value="custom">مقدار دلخواه</option>
                </select>

                {inst.feeOption === "custom" && (
                  <input
                    type="text"
                    placeholder="مقدار دلخواه (تومان)"
                    value={
                      inst.customFee
                        ? inst.customFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : ""
                    }
                    onChange={(e) => {
                      const raw = e.target.value
                        .replace(/,/g, "")
                        .replace(/\D/g, "");
                      const updated = [...supportInstallments];
                      updated[i].customFee = raw;
                      setSupportInstallments(updated);
                    }}
                    style={{ marginTop: "8px" }}
                  />
                )}
              </div>

              <div className="form-group">
                <label>تاریخ قسط</label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={inst.date}
                  onChange={(date) => {
                    const updated = [...supportInstallments];
                    updated[i].date = date?.format?.("YYYY/MM/DD") || "";
                    setSupportInstallments(updated);
                  }}
                  inputClass="custom-input"
                  containerStyle={{ width: "100%" }}
                  placeholder="تاریخ قسط را انتخاب کنید"
                />
              </div>
            </div>
          ))}
      </form>
    </div>
  );
};

export default FeeInfoStep;
