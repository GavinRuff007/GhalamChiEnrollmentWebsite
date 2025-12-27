import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CustomerDashboard from "../Dashboard/CustomerDashboard";
import AdminDashboard from "../Dashboard/AdminDashboard";
import InsertNewClient from "../Dashboard/InsertNewClient/InsertNewClient";
import Records from "../Dashboard/Records/Records";
import ConfigLoginSystem from "../Dashboard/configSystem(Admin)/ConfigLoginSystem";
import Login from "../Authorization/Login";
import YearSelect from "../Dashboard/Records/YearSelect";
import ProtectedRoute, { DefaultRedirect } from "../validations/ProtectedRoute";
import AppHeader from "../Dashboard/Appheader";
import YearGate from "../Dashboard/Records/YearGate";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" />

      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <AppHeader />

        <Routes>
          {/* ===================== */}
          {/* 🔐 Login */}
          {/* ===================== */}
          <Route path="/login" element={<Login />} />

          {/* ===================== */}
          {/* 👤 User Dashboard */}
          {/* ===================== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<InsertNewClient />} />
            <Route path="edit/:nationalCode" element={<InsertNewClient />} />
          </Route>

          {/* ===================== */}
          {/* 👑 Admin Dashboard */}
          {/* ===================== */}
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<InsertNewClient />} />
            <Route path="edit/:nationalCode" element={<InsertNewClient />} />
            <Route path="config" element={<ConfigLoginSystem />} />

            {/* 🔵 ثبت‌نام‌ها (Admin Only) */}
            <Route path="records" element={<YearSelect />} />
            <Route path="records/:year" element={<YearGate />} />
            <Route path="records/:year/:unit" element={<Records />} />
          </Route>

          {/* ===================== */}
          {/* 🔁 Default Redirect */}
          {/* ===================== */}
          <Route path="/" element={<DefaultRedirect />} />

          {/* ===================== */}
          {/* ❌ 404 */}
          {/* ===================== */}
          <Route
            path="*"
            element={
              <h2 style={{ padding: "50px", textAlign: "center" }}>
                صفحه مورد نظر یافت نشد 😕
              </h2>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
