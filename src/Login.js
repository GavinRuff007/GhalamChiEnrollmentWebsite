import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button, Card } from "antd";
import "./login.css";
import backgroundImage from "../src/back.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [mathExpression, setMathExpression] = useState(generateMathExpression());
  const [userAnswer, setUserAnswer] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  function generateMathExpression() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operator = Math.random() < 0.5 ? "+" : "-";
    return { num1, num2, operator };
  }

  const handleLogin = (values) => {
    const { username, password } = values;
    if (!captchaValid) {
      toast.error("لطفاً کپچا را به‌درستی حل کنید");
      return;
    }

    fetch("http://localhost:8080/user/" + username)
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

  const checkCaptcha = () => {
    const correctAnswer = eval(`${mathExpression.num1} ${mathExpression.operator} ${mathExpression.num2}`);
    setCaptchaValid(parseInt(userAnswer) === correctAnswer);
  };

  const refreshCaptcha = () => {
    setMathExpression(generateMathExpression());
    setUserAnswer("");
    setCaptchaValid(false);
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

            <Form.Item
              label={
                <span className="label-text">
                  {`حل کنید: ${mathExpression.num1} ${mathExpression.operator} ${mathExpression.num2}`}
                </span>
              }
              name="userCaptcha"
            >
              <Input
                size="large"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onBlur={checkCaptcha}
                placeholder="پاسخ خود را وارد کنید"
              />
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

              <Button type="link" onClick={refreshCaptcha} block>
                نوسازی کپچا
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
