import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AppHeader = () => {
  const [displayUsername, setDisplayUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setShowMenu(false);
      return;
    }

    setShowMenu(true);

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const username = sessionStorage.getItem("username");
    if (username) {
      setDisplayUsername(username);
    } else {
      setDisplayUsername("کاربر");
    }
  }, [location, navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {showMenu && (
        <header
          style={{
            backgroundColor: "#081c2c",
            padding: "10px 20px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            direction: "rtl",
            fontFamily: "'Vazir', 'Segoe UI', Tahoma, sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              to="/dashboard"
              style={{ color: "white", textDecoration: "none", fontWeight: 500 }}
            >
              داشبورد
            </Link>
            <Link
              to="/dashboard/records"
              style={{ color: "white", textDecoration: "none", fontWeight: 500 }}
            >
              اطلاعات ثبت‌شده
            </Link>
          </div>

          {/* بخش چپ */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: "#ddd", fontSize: "0.95rem" }}>
              خوش آمدی <b>{displayUsername}</b>
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid #52c41a",
                color: "#52c41a",
                borderRadius: "6px",
                padding: "4px 10px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#52c41a";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#52c41a";
              }}
            >
              خروج
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default AppHeader;
