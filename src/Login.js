import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button, Card } from "antd";
import "./login.css";
import backgroundImage from "../src/back.jpg";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleLogin = (values) => {
    const { username, password } = values;

    fetch("http://localhost:8090/user/" + username)
      .then((res) => res.json())
      .then((resp) => {
        if (!resp.username) {
          toast.error("نام کاربری یا رمز عبور نادرست است");
        } else if (resp.password === password) {
          toast.success("ورود با موفقیت انجام شد");
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("userrole", resp.role);
          navigate("/");
        } else {
          toast.error("نام کاربری یا رمز عبور اشتباه است");
        }
      })
      .catch((err) => {
        toast.error("ورود ناموفق بود: " + err.message);
      });
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
              <Button type="primary" htmlType="submit" block size="large">
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
