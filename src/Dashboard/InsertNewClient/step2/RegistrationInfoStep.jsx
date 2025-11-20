import React from "react";

const RegistrationInfoStep = ({
  typeOption,
  setTypeOption,
  examCount,
  setExamCount,
  discountExam,
  setDiscountExam,
  discountClass,
  setDiscountClass,
  classCount,
  classInfo,
  handleClassChange,
  subjectList,
  errors,
  specialSupport,
  setSpecialSupport,
  formData,
  handleChange,
  bookVoucher,      // مقدار بن کتاب
  setBookVoucher,   // setter برای بن کتاب
}) => {
  return (
    <div className="next-page">
      <h3>مرحله دوم: اطلاعات ثبت‌نام</h3>
      <form className="student-form">
        <div className="form-grid">
          {/* ===== نوع ثبت‌نام ===== */}
          <div className="form-group">
            <label>
              نوع <span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={typeOption}
              onChange={(e) => {
                const value = e.target.value;
                setTypeOption(value);
                if (["1", "2", "3", "4"].includes(value)) {
                  setExamCount("none");
                } else {
                  setExamCount("");
                }
              }}
              className={errors.typeOption ? "error" : ""}
            >
              <option value="">انتخاب کنید</option>
              <option value="هیچکدام">هیچکدام</option>
              <option value="1">1کلاس</option>
              <option value="2">2کلاس</option>
              <option value="3">3کلاس</option>
              <option value="4">4کلاس</option>
              <option value="آزمون">آزمون</option>
              <option value="1+آزمون">1کلاس+آزمون</option>
              <option value="2+آزمون">2کلاس+آزمون</option>
              <option value="3+آزمون">3کلاس+آزمون</option>
              <option value="4+آزمون">4کلاس+آزمون</option>
            </select>
            {errors.typeOption && (
              <span className="error-text">{errors.typeOption}</span>
            )}
          </div>

          {/* ===== نام مسئول جذب ===== */}
          <div className="form-group">
            <label>نام مسئول جذب</label>
            <select
              name="recruiter"
              value={formData.recruiter || ""}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={`مسئول ${i + 1}`}>
                  مسئول {i + 1}
                </option>
              ))}
              <option value="custom">وارد کردن دستی</option>
            </select>
            {formData.recruiter === "custom" && (
              <input
                type="text"
                name="recruiter"
                placeholder="نام مسئول جذب را وارد کنید"
                value={formData.recruiter}
                onChange={handleChange}
                className={errors.recruiter ? "error" : ""}
                style={{ marginTop: "8px" }}
              />
            )}
          </div>

          {/* ===== تعداد آزمون ثبت‌نامی ===== */}
          <div className="form-group">
            <label>
              تعداد آزمون ثبت‌نامی <span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={examCount}
              onChange={(e) => setExamCount(e.target.value)}
              disabled={["1", "2", "3", "4", "هیچکدام"].includes(typeOption)}
              className={errors.examCount ? "error" : ""}
            >
              <option value="">انتخاب کنید</option>
              <option value="none">آزمون ندارد</option>
              {[...Array(24)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.examCount && (
              <span className="error-text">{errors.examCount}</span>
            )}
          </div>

          {/* ===== بن کتاب ===== */}
          <div className="form-group">
            <label>بن کتاب</label>
            <select
              value={bookVoucher || ""}
              onChange={(e) => setBookVoucher(e.target.value)}
              className={errors.bookVoucher ? "error" : ""}
            >
              <option value="">انتخاب کنید</option>
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
            </select>
            {errors.bookVoucher && (
              <span className="error-text">{errors.bookVoucher}</span>
            )}
          </div>

          {/* ===== تخفیف آزمون ===== */}
          <div className="form-group">
            <label>تخفیف آزمون (تومان)</label>
            <input
              type="text"
              placeholder="مبلغ تخفیف آزمون"
              value={
                discountExam
                  ? discountExam.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""
              }
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
                setDiscountExam(rawValue);
              }}
            />
          </div>

          {/* ===== تخفیف کلاس ===== */}
          <div className="form-group">
            <label>تخفیف کلاس (تومان)</label>
            <input
              type="text"
              placeholder="مبلغ تخفیف کلاس"
              value={
                discountClass
                  ? discountClass.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""
              }
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
                setDiscountClass(rawValue);
              }}
            />
          </div>
        </div>

        {/* ===== کلاس‌ها ===== */}
        {classCount > 0 && (
          <>
            <hr />
            <h4 style={{ marginBottom: "10px" }}>کلاس‌ها</h4>
            <div className="form-grid">
              {Array.from({ length: classCount }).map((_, index) => (
                <React.Fragment key={index}>
                  {/* ===== نام کلاس ===== */}
                  <div className="form-group">
                    <label>
                      نام کلاس {index + 1} <span style={{ color: "red" }}>*</span>
                    </label>
                    {subjectList.length > 0 ? (
                      <select
                        value={classInfo[index]?.name || ""}
                        onChange={(e) =>
                          handleClassChange(index, "name", e.target.value)
                        }
                        className={errors[`class_name_${index}`] ? "error" : ""}
                      >
                        <option value="">انتخاب کنید</option>
                        {subjectList.map((subj, idx) => (
                          <option key={idx} value={subj}>
                            {subj}
                          </option>
                        ))}
                        <option value="custom">وارد کردن دستی</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={`نام کلاس ${index + 1}`}
                        value={classInfo[index]?.name || ""}
                        onChange={(e) =>
                          handleClassChange(index, "name", e.target.value)
                        }
                        className={errors[`class_name_${index}`] ? "error" : ""}
                      />
                    )}
                    {classInfo[index]?.name === "custom" && (
                      <input
                        type="text"
                        placeholder="نام کلاس را وارد کنید"
                        value={classInfo[index]?.customName || ""}
                        onChange={(e) =>
                          handleClassChange(index, "customName", e.target.value)
                        }
                        className={errors[`class_name_${index}`] ? "error" : ""}
                        style={{ marginTop: "8px" }}
                      />
                    )}
                    {errors[`class_name_${index}`] && (
                      <span className="error-text">
                        {errors[`class_name_${index}`]}
                      </span>
                    )}
                  </div>

                  {/* ===== شهریه کلاس ===== */}
                  <div className="form-group">
                    <label>
                      شهریه کلاس {index + 1} <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      value={classInfo[index]?.feeOption || ""}
                      onChange={(e) =>
                        handleClassChange(index, "feeOption", e.target.value)
                      }
                      className={errors[`class_fee_${index}`] ? "error" : ""}
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="200000">200٬000 تومان</option>
                      <option value="300000">300٬000 تومان</option>
                      <option value="400000">400٬000 تومان</option>
                      <option value="custom">انتخاب مقدار دلخواه</option>
                    </select>

                    {classInfo[index]?.feeOption === "custom" && (
                      <input
                        type="text"
                        placeholder="مقدار دلخواه (تومان)"
                        value={
                          classInfo[index]?.customFee
                            ? classInfo[index].customFee.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              )
                            : ""
                        }
                        onChange={(e) => {
                          const rawValue = e.target.value
                            .replace(/,/g, "")
                            .replace(/\D/g, "");
                          handleClassChange(index, "customFee", rawValue);
                        }}
                        style={{ marginTop: "8px" }}
                        className={errors[`class_fee_${index}`] ? "error" : ""}
                      />
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        )}

        {/* ===== پشتیبان ویژه ===== */}
        <hr />
        <div className="special-toggle-container">
          <div className="toggle-right">
            <label style={{ fontWeight: "bold", marginLeft: "10px" }}>
              متقاضی خواستار پشتیبانی ویژه است
            </label>
            <input
              type="checkbox"
              checked={specialSupport}
              onChange={(e) => setSpecialSupport(e.target.checked)}
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* ===== توضیحات ===== */}
        <hr style={{ margin: "30px 0", border: "1px solid #ccc" }} />
        <div className="form-group" style={{ width: "100%" }}>
          <label>توضیحات مشتری</label>
          <textarea
            rows="4"
            placeholder="توضیحات یا یادداشت‌های مشتری را وارد کنید..."
            style={{
              width: "100%",
              resize: "vertical",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontFamily: "inherit",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default RegistrationInfoStep;
