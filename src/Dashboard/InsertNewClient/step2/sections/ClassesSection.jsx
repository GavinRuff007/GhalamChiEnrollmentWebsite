import React from "react";
import { updateRegistrationInfo } from "../../../../slices/formSlice";

const ClassesSection = ({ reg, subjects, dispatch }) => {
  const updateClassInfo = (index, field, value) => {
    const updated = [...reg.classInfo];
    updated[index] = { ...updated[index], [field]: value };

    dispatch(updateRegistrationInfo({ classInfo: updated }));
  };

  return (
    <>
      <hr />
      <h4>کلاس‌ها</h4>

      {reg.classInfo.map((info, index) => {
        const selectedSubject =
          subjects.find((s) => s.className === info.name) || {};

        return (
          <div key={index} className="class-row">
            <div className="form-group">
              <label>نام کلاس {index + 1}</label>
              <select
                value={info.name || ""}
                onChange={(e) =>
                  updateClassInfo(index, "name", e.target.value)
                }
              >
                <option value="">انتخاب کنید</option>
                {subjects.map((subj) => (
                  <option key={subj.id} value={subj.className}>
                    {subj.className}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>تخفیف</label>
              <input
                value={info.discount || ""}
                onChange={(e) =>
                  updateClassInfo(index, "discount", e.target.value)
                }
              />
            </div>

            <div className="class-fee-box">
              <label className="fee-label">شهریه کلاس:</label>
              <div className="fee-value">
                {(selectedSubject?.fee || 0).toLocaleString("fa-IR")} تومان
              </div>
            </div>

            <div className="form-group">
              <label>تاریخ شروع</label>
              <input
                type="date"
                value={info.startDate || ""}
                onChange={(e) =>
                  updateClassInfo(index, "startDate", e.target.value)
                }
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ClassesSection;
