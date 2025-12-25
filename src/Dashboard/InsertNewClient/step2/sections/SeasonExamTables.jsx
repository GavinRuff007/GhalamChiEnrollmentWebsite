import React from "react";
import { useGetExamDatesQuery } from "../../../../services/apiSlice";
import { updateRegistrationInfo } from "../../../../slices/formSlice";

const seasons = [
  { key: "spring", label: "بهار", color: "#e8f5e9" },
  { key: "summer", label: "تابستان", color: "#ffebee" },
  { key: "autumn", label: "پاییز", color: "#fffde7" },
  { key: "winter", label: "زمستان", color: "#e3f2fd" },
];

const seasonMap = {
  spring: "SPRING",
  summer: "SUMMER",
  autumn: "AUTUMN",
  winter: "WINTER",
};

const emptyRow = {
  examId: "",
  date: "",
  status: "",
  price: "",
};

const thStyle = {
  borderBottom: "2px solid #ccc",
  padding: "6px 4px",
  textAlign: "right",
  fontWeight: 600,
  fontSize: 13,
};

const tdStyle = {
  borderBottom: "1px solid #ddd",
  padding: "6px 4px",
  verticalAlign: "top",
  fontSize: 12,
};

const SeasonExamTables = ({ reg, dispatch }) => {
  const { data: examDates = [] } = useGetExamDatesQuery(undefined, {
    skip: !reg.examCount || reg.examCount === "none",
  });

  if (!reg.examCount || reg.examCount === "none") return null;

  // ✅ آپدیت یک‌مرحله‌ای هر سطر
  const updateRow = (season, index, updatedFields) => {
    const rows = [...(reg.examSeasons?.[season] || [{ ...emptyRow }])];

    rows[index] = {
      ...rows[index],
      ...updatedFields,
    };

    dispatch(
      updateRegistrationInfo({
        examSeasons: {
          ...reg.examSeasons,
          [season]: rows,
        },
      })
    );
  };

  const addRow = (season) => {
    dispatch(
      updateRegistrationInfo({
        examSeasons: {
          ...reg.examSeasons,
          [season]: [
            ...(reg.examSeasons?.[season] || []),
            { ...emptyRow },
          ],
        },
      })
    );
  };

  const removeRow = (season, index) => {
    const rows = [...(reg.examSeasons?.[season] || [])];
    if (rows.length <= 1) return;

    rows.splice(index, 1);

    dispatch(
      updateRegistrationInfo({
        examSeasons: {
          ...reg.examSeasons,
          [season]: rows,
        },
      })
    );
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3>آزمون‌ها به تفکیک فصل</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          marginTop: 16,
        }}
      >
        {seasons.map((s) => {
          const rows = reg.examSeasons?.[s.key] || [{ ...emptyRow }];

          const seasonExamDates = examDates.filter(
            (e) => e.season === seasonMap[s.key]
          );

          return (
            <div
              key={s.key}
              style={{
                background: s.color,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            >
              <h4 style={{ marginBottom: 8 }}>{s.label}</h4>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  tableLayout: "fixed",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: "40%" }}>تاریخ آزمون</th>
                    <th style={{ ...thStyle, width: "30%" }}>وضعیت</th>
                    <th
                      style={{
                        ...thStyle,
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      هزینه
                    </th>
                    <th
                      style={{
                        ...thStyle,
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      حذف
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i}>
                      {/* تاریخ آزمون */}
                      <td style={tdStyle}>
                        <select
                          value={row.examId}
                          style={{ fontSize: 12, width: "100%" }}
                          onChange={(e) => {
                            const selected = seasonExamDates.find(
                              (d) => d.id === Number(e.target.value)
                            );
                            if (!selected) return;

                            updateRow(s.key, i, {
                              examId: selected.id,
                              date: selected.date,
                              price: selected.price,
                            });
                          }}
                        >
                          <option value="">انتخاب</option>
                          {seasonExamDates.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.date}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* وضعیت */}
                      <td style={{ ...tdStyle, paddingTop: 10 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <label style={{ display: "flex", gap: 4 }}>
                            <input
                              type="radio"
                              name={`status-${s.key}-${i}`}
                              checked={row.status === "registered"}
                              onChange={() =>
                                updateRow(s.key, i, {
                                  status: "registered",
                                })
                              }
                            />
                            ثبت
                          </label>

                          <label style={{ display: "flex", gap: 4 }}>
                            <input
                              type="radio"
                              name={`status-${s.key}-${i}`}
                              checked={row.status === "not_registered"}
                              onChange={() =>
                                updateRow(s.key, i, {
                                  status: "not_registered",
                                })
                              }
                            />
                            عدم ثبت
                          </label>
                        </div>
                      </td>

                      {/* هزینه */}
                      <td style={{ ...tdStyle, textAlign: "center" }}>
                        <input
                          type="text"
                          disabled
                          style={{
                            fontSize: 12,
                            width: "80%",
                            textAlign: "center",
                          }}
                          value={
                            row.price
                              ? row.price.toLocaleString()
                              : ""
                          }
                        />
                      </td>

                      {/* حذف */}
                      <td style={{ ...tdStyle, textAlign: "center" }}>
                        <button
                          type="button"
                          onClick={() => removeRow(s.key, i)}
                          disabled={rows.length === 1}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor:
                              rows.length === 1
                                ? "not-allowed"
                                : "pointer",
                            opacity: rows.length === 1 ? 0.3 : 1,
                            fontSize: 14,
                          }}
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* افزودن سطر */}
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        onClick={() => addRow(s.key)}
                        style={{
                          border: "none",
                          background: "transparent",
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                      >
                        ➕
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeasonExamTables;
