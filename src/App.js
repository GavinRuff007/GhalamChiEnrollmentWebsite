import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import DashboardHome from './DashboardHome';
import Movies from './Movies';
import Upload from './Upload';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import AppHeader from './Appheader';
import Customer from './Customer';

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
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<Customer />} />

          {/* مسیر اصلی داشبورد با صفحات داخلی (nested routes) */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />  {/* صفحه اصلی داشبورد */}
            <Route path="movies" element={<Movies />} />   {/* نمودارها */}
            <Route path="upload" element={<Upload />} />   {/* آپلود فایل */}
          </Route>

          {/* ریدایرکت به داشبورد برای مسیر اصلی */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* مسیر برای صفحات ناموجود */}
          <Route path="*" element={<h2 style={{ padding: '50px' }}>صفحه مورد نظر یافت نشد 😕</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
