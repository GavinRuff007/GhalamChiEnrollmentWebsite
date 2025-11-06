import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CustomerDashboard from "../Dashboard/CustomerDashboard";
import InsertNewClient from "../Dashboard/InsertNewClient/InsertNewClient";
import Records from "../Dashboard/Records/Records";
import AdminDashboard from "../Dashboard/AdminDashboard";
import Login from "../Authorization/Login";
import ProtectedRoute, { DefaultRedirect } from "../validations/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import AppHeader from "../Dashboard/Appheader";
import ConfigLoginSystem from "../Dashboard/configSystem(Admin)/ConfigLoginSystem";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" />

      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <AppHeader />

        <Routes>
          {/* صفحه ورود */}
          <Route path="/login" element={<Login />} />

          {/* مسیر برای کاربر معمولی */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<InsertNewClient />} />
            <Route path="records" element={<Records />} />
          </Route>

          {/* مسیر برای ادمین */}
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<InsertNewClient />} />
            <Route path="config" element={<ConfigLoginSystem />} /> {/* مسیر جدید */}
            <Route path="records" element={<Records />} />
          </Route>

          {/* مسیر پیش‌فرض بر اساس نقش */}
          <Route path="/" element={<DefaultRedirect />} />

          {/* صفحه 404 */}
          <Route
            path="*"
            element={<h2 style={{ padding: "50px" }}>صفحه مورد نظر یافت نشد 😕</h2>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
