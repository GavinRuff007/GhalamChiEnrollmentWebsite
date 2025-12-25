import React from "react";
import { updateRegistrationInfo } from "../../../../slices/formSlice";

import {
  useGetRecruitersQuery,
  useAddRecruiterMutation,
} from "../../../../services/apiSlice";

const TypeSection = ({ reg, errors, dispatch }) => {
  const handleValue = (e) => {
    dispatch(updateRegistrationInfo({ [e.target.name]: e.target.value }));
  };

  const { data: recruiters = [] } = useGetRecruitersQuery();
  const [addRecruiter] = useAddRecruiterMutation();

  const handleType = (e) => {
    const value = e.target.value;

    const classCount = /^\d/.test(value) ? parseInt(value[0]) : 0;
    const examCount = ["1", "2", "3", "4"].includes(value) ? "none" : "";

    dispatch(
      updateRegistrationInfo({
        typeOption: value,
        classCount,
        classInfo: Array.from({ length: classCount }, (_, i) => ({
          ...(reg.classInfo[i] || {}),
        })),
        examCount,
      })
    );
  };

  return (
    <div className="form-grid">

      {/* نوع ثبت‌نام */}
      <div className="form-group">
        <label>
          نوع <span className="required">*</span>
        </label>
        <select
          name="typeOption"
          value={reg.typeOption || ""}
          onChange={handleType}
          className={errors.typeOption ? "error" : ""}
        >
          <option value="">انتخاب کنید</option>
          <option value="هیچکدام">هیچکدام</option>
          <option value="1">۱ کلاس</option>
          <option value="2">۲ کلاس</option>
          <option value="3">۳ کلاس</option>
          <option value="4">۴ کلاس</option>
          <option value="آزمون">آزمون</option>
          <option value="1+آزمون">۱ کلاس + آزمون</option>
          <option value="2+آزمون">۲ کلاس + آزمون</option>
          <option value="3+آزمون">۳ کلاس + آزمون</option>
          <option value="4+آزمون">۴ کلاس + آزمون</option>
        </select>
        {errors.typeOption && <p className="error-text">{errors.typeOption}</p>}
      </div>

      {/* مسئول جذب */}
      <div className="form-group">
        <label>مسئول جذب</label>

        <select
          name="recruiter"
          value={reg.recruiter || ""}
          onChange={handleValue}
        >
          <option value="">انتخاب کنید</option>

          {recruiters.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}

        <option value="custom">➕ وارد کردن دستی</option>
      </select>

      {reg.recruiter === "custom" && (
        <input
          placeholder="نام مسئول جدید"
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const name = e.target.value.trim();
              if (!name) return;

              await addRecruiter({ name }).unwrap();
              dispatch(updateRegistrationInfo({ recruiter: name }));
            }
          }}
        />
      )}
    </div>


      {/* تعداد آزمون */}
      <div className="form-group">
        <label>تعداد آزمون</label>
        <select
          name="examCount"
          value={reg.examCount || ""}
          onChange={handleValue}
          disabled={["1", "2", "3", "4", "هیچکدام"].includes(reg.typeOption)}
        >
          <option value="">انتخاب کنید</option>
          <option value="none">آزمون ندارد</option>
          {[...Array(24)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* بن کتاب */}
      <div className="form-group">
        <label>بن کتاب</label>
        <select
          name="bookVoucher"
          value={reg.bookVoucher || ""}
          onChange={handleValue}
        >
          <option value="">انتخاب کنید</option>
          <option value="بله">بله</option>
          <option value="خیر">خیر</option>
        </select>
      </div>

      {/* تخفیف آزمون */}
      <div className="form-group">
        <label>تخفیف آزمون</label>
        <input
          name="discountExam"
          value={reg.discountExam || ""}
          onChange={handleValue}
        />
      </div>

      {/* تخفیف کلاس */}
      <div className="form-group">
        <label>تخفیف کلاس</label>
        <input
          name="discountClass"
          value={reg.discountClass || ""}
          onChange={handleValue}
        />
      </div>

    </div>
  );
};

export default TypeSection;
