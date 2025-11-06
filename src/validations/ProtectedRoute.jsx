import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = sessionStorage.getItem("accessToken");
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const decoded = parseJwt(token);
  const roles = decoded?.roles || [];
  if (requiredRole && !roles.includes(requiredRole)) {
    console.warn("⛔ دسترسی غیرمجاز به مسیر:", location.pathname);
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};


const DefaultRedirect = () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) return <Navigate to="/login" replace />;

  const decoded = parseJwt(token);
  const roles = decoded?.roles || [];

  if (roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/adminDashboard" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

export { DefaultRedirect };
export default ProtectedRoute;
