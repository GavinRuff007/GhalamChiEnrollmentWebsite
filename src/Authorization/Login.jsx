import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button, Card } from "antd";
import "./login.css";
import backgroundImage from "./assets/back.jpg";
import { useLoginMutation } from "../services/apiSlice"; // ⬅️ اضافه کن

const Login = () => {
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginMutation();   // ⬅️ RTK Login

  const handleLogin = async (values) => {
    const { username, password } = values;

    try {
      // 1: فراخوانی login از طریق RTK Query
      const resp = await loginUser({ username, password }).unwrap();

      if (resp.state !== "OK") {
        toast.error("نام کاربری یا رمز عبور اشتباه است");
        return;
      }

      // 2: ذخیره AccessToken
      sessionStorage.setItem("accessToken", resp.accessToken);

      toast.success("ورود با موفقیت انجام شد");

      // 3: انقضای خودکار توکن بعد از 5 دقیقه
      setTimeout(() => {
        sessionStorage.removeItem("accessToken");
        toast.info("توکن منقضی شد.");
      }, 5 * 60 * 1000);

      // 4: انتقال بر اساس نقش
      if (resp.roles?.includes("ROLE_ADMIN")) {
        navigate("/adminDashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      toast.error("خطا در ورود");
      console.error("LOGIN ERROR:", err);
    }
  };

  return (
    <div className="login-container" dir="rtl">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Card
          className="login-card"
          title={<span className="login-title">ورود کاربر</span>}
        >
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label={<span className="label-text">نام کاربری</span>}
              name="username"
              rules={[{ required: true, message: "لطفاً نام کاربری را وارد کنید" }]}
            >
              <Input size="large" placeholder="نام کاربری خود را وارد کنید" />
            </Form.Item>

            <Form.Item
              label={<span className="label-text">رمز عبور</span>}
              name="password"
              rules={[{ required: true, message: "لطفاً رمز عبور را وارد کنید" }]}
            >
              <Input.Password size="large" placeholder="رمز عبور خود را وارد کنید" />
            </Form.Item>

            <div className="button-group">
              <Button type="primary" htmlType="submit" block size="large" loading={isLoading}>
                ورود
              </Button>

              <Button
                type="link"
                onClick={() => navigate("/register")}
                block
                className="register-btn"
              >
                ثبت‌نام
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
