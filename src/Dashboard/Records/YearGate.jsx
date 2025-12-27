import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const YearGate = () => {
  const { year } = useParams();
  const navigate = useNavigate();

  const roles = JSON.parse(sessionStorage.getItem("roles") || "[]");
  const isAdmin = roles.includes("ROLE_ADMIN");

  if (!isAdmin) {
    return <p style={{ textAlign: "center", marginTop: 40 }}>تو Admin نیستی</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h3>سال انتخاب‌شده: {year}</h3>

      <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
        <span
          style={{ color: "#1e88e5", cursor: "pointer" }}
          onClick={() => navigate("girls")}
        >
          واحد دختران
        </span>

        <span
          style={{ color: "#1e88e5", cursor: "pointer" }}
          onClick={() => navigate("boys")}
        >
          واحد پسران
        </span>
      </div>
    </div>
  );
};

export default YearGate;
