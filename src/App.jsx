import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import DashboardHome from './DashboardHome';
import Records from './Records'; // 👈 صفحه جدید برای اطلاعات ثبت‌شده
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import AppHeader from './Appheader';


function App() {
  return (
    <div className="App">
      {/* نوتیفیکشن‌ها */}
      <ToastContainer theme="colored" position="top-center" />

      <BrowserRouter>
        {/* هدر بالای همه صفحات */}
        <AppHeader />

        <Routes>
          {/* مسیرهای عمومی */}
          <Route path="/login" element={<Login />} />

          {/* مسیر اصلی داشبورد با صفحات داخلی (nested routes) */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />  {/* ثبت اطلاعات جدید */}
            <Route path="records" element={<Records />} /> {/* اطلاعات ثبت‌شده */}
          </Route>

          {/* ریدایرکت به داشبورد برای مسیر اصلی */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* مسیر برای صفحات ناموجود */}
          <Route
            path="*"
            element={
              <h2 style={{ padding: '50px' }}>
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
