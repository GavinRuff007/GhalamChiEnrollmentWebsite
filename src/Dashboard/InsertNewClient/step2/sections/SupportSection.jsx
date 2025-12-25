import React from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { updateRegistrationInfo } from "../../../../slices/formSlice";
import "./SupportSection.css";

/* =======================
   Helpers
======================= */
const toEnglishDigits = (str = "") =>
  str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

/* =======================
   Constants
======================= */
const seasons = [
  { key: "SPRING", label: "بهار" },
  { key: "SUMMER", label: "تابستان" },
  { key: "AUTUMN", label: "پاییز" },
  { key: "WINTER", label: "زمستان" },
];

const seasonRanges = {
  SPRING: { startMonth: 1, startDay: 1, endMonth: 3, endDay: 31 },
  SUMMER: { startMonth: 4, startDay: 1, endMonth: 6, endDay: 31 },
  AUTUMN: { startMonth: 7, startDay: 1, endMonth: 9, endDay: 30 },
  WINTER: { startMonth: 10, startDay: 1, endMonth: 12, endDay: 29 },
};

const emptySupport = {
  advisorId: "",
  advisorDailyPrice: 0,
  season: "",
  startDate: "",
};

/* =======================
   Component
======================= */
const SupportSection = ({ reg, supporters, dispatch }) => {
  const list =
    reg.supportInfoList && reg.supportInfoList.length
      ? reg.supportInfoList
      : [emptySupport];

  /* ---------- CRUD ---------- */
  const updateRow = (index, fields) => {
    const rows = [...list];
    rows[index] = { ...rows[index], ...fields };
    dispatch(updateRegistrationInfo({ supportInfoList: rows }));
  };

  const addRow = () => {
    dispatch(
      updateRegistrationInfo({
        supportInfoList: [...list, { ...emptySupport }],
      })
    );
  };

  const removeRow = (index) => {
    let rows = [...list];
    rows.splice(index, 1);
    if (rows.length === 0) rows = [{ ...emptySupport }];
    dispatch(updateRegistrationInfo({ supportInfoList: rows }));
  };

  /* ---------- Date helpers ---------- */
  const getSeasonMinMax = (season, year) => {
    if (!season || !year) return {};
    const r = seasonRanges[season];

    return {
      minDate: new DateObject({
        calendar: persian,
        locale: persian_fa,
        year,
        month: r.startMonth,
        day: r.startDay,
      }),
      maxDate: new DateObject({
        calendar: persian,
        locale: persian_fa,
        year,
        month: r.endMonth,
        day: r.endDay,
      }),
    };
  };

  const calcDuration = (startStr, endDateObj) => {
    if (!startStr || !endDateObj) return null;

    const start = new DateObject({
      date: toEnglishDigits(startStr),
      calendar: persian,
      locale: persian_fa,
    });

    const diff =
      endDateObj.toDate().getTime() -
      start.toDate().getTime();

    if (isNaN(diff) || diff < 0) return null;

    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  };


  /* =======================
     Render
  ======================= */
  return (
    <>
      <hr />
      {/* Header */}
      <div className="support-header">
        <label className="support-title">
          پشتیبانی ویژه
          <input
            type="checkbox"
            checked={reg.specialSupport || false}
            onChange={(e) =>
              dispatch(
                updateRegistrationInfo({
                  specialSupport: e.target.checked,
                })
              )
            }
          />
        </label>
      </div>

      {reg.specialSupport &&
        list.map((row, i) => {
          const year = row.startDate
            ? Number(toEnglishDigits(row.startDate).split("/")[0])
            : new DateObject({ calendar: persian }).year;

          const { minDate, maxDate } = getSeasonMinMax(
            row.season,
            year
          );

          const duration = calcDuration(
            row.startDate,
            maxDate
          );

          const filteredSupporters = supporters;

          return (
            <div key={i} className="support-grid-row">
              {/* Advisor */}
              <div className="form-group">
                <label>مشاور ویژه</label>
                <select
                  value={row.advisorId}
                  disabled={!row.season}
                  onChange={(e) => {
                    const selected = filteredSupporters.find(
                      (sp) => sp.id === Number(e.target.value)
                    );

                    if (!selected) return;

                    updateRow(i, {
                      advisorId: selected.id,
                      advisorDailyPrice: selected.dailyPrice,
                    });
                  }}
                >
                  <option value="">انتخاب مشاور</option>
                  {filteredSupporters.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {sp.fullName} —{" "}
                      {sp.dailyPrice.toLocaleString("fa-IR")} تومان
                    </option>
                  ))}
                </select>
              </div>

              {/* Season */}
              <div className="form-group">
                <label>فصل</label>
                <select
                  value={row.season}
                  onChange={(e) =>
                    updateRow(i, {
                      season: e.target.value,
                      startDate: "",
                      advisorId: "",
                      advisorDailyPrice: 0,
                    })
                  }
                >
                  <option value="">انتخاب فصل</option>
                  {seasons.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start date */}
              <div className="form-group">
                <label>تاریخ شروع</label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={row.startDate}
                  disabled={!row.season}
                  minDate={minDate}
                  maxDate={maxDate}
                  onChange={(d) =>
                    updateRow(i, {
                      startDate: d?.format?.("YYYY/MM/DD"),
                    })
                  }
                  inputClass="custom-input"
                />
              </div>

              {/* Summary */}
              <div className="support-summary-box">
                <strong>خلاصه</strong>

                {row.season && row.startDate && maxDate ? (
                  <>
                    <div>
                      فصل:{" "}
                      {
                        seasons.find(
                          (s) => s.key === row.season
                        )?.label
                      }
                    </div>
                    <div>شروع: {row.startDate}</div>
                    <div>
                      پایان: {maxDate.format("YYYY/MM/DD")}
                    </div>
                    {duration && (
                      <div>مدت: {duration} روز</div>
                    )}
                    {row.advisorDailyPrice > 0 &&
                      duration && (
                        <div>
                          هزینه:{" "}
                          {(
                            row.advisorDailyPrice *
                            duration
                          ).toLocaleString("fa-IR")}{" "}
                          تومان
                        </div>
                      )}
                  </>
                ) : (
                  <div className="muted">
                    اطلاعات ناقص است
                  </div>
                )}
              </div>

              {/* Remove */}
              <div className="support-remove">
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  title="حذف"
                >
                  ❌
                </button>
              </div>
            </div>
          );
        })}

      {reg.specialSupport && (
        <button
          type="button"
          className="add-support-btn"
          onClick={addRow}
        >
          ➕ افزودن پشتیبانی ویژه
        </button>
      )}
    </>
  );
};

export default SupportSection;
