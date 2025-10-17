import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, ConfigProvider, theme as antdTheme } from "antd";
import {
  UserAddOutlined,  
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import faIR from "antd/es/locale/fa_IR";
import "./Dashboard.css";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleMenu = () => setCollapsed(!collapsed);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  const theme = darkTheme ? "dark" : "light";
  const menuItemStyles = { color: darkTheme ? "white" : "black" };
  const bottomButtonStyle = {
      marginRight: "8px",
      color: darkTheme ? "#fff" : "#000", // 👈 وقتی تم تیره است، متن سفید شود
      borderColor: darkTheme ? "#444" : "#ddd",
      backgroundColor: darkTheme ? "#1677ff" : "#f0f0f0", // (اختیاری) زمینه‌ هم زیباتر می‌شود
};


  return (
    <ConfigProvider
      direction="rtl"
      locale={faIR}
      theme={{
        algorithm: darkTheme ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { fontFamily: "Vazir, sans-serif" },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          direction: "rtl",
          fontFamily: "Vazir, sans-serif",
        }}
      >
        {/* Sidebar */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          theme={theme}
          reverseArrow
        >
          <div
            className="logo"
            style={{
              height: 64,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: 8,
              textAlign: "center",
              lineHeight: "64px",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {!collapsed ? "مدیریت" : "مد"}
          </div>

          <Menu theme={theme} mode="inline" defaultSelectedKeys={["1"]}>
            {/* ثبت اطلاعات جدید */}
            <Menu.Item key="1" icon={<UserAddOutlined  />} style={menuItemStyles}>
              <Link to="">
                <span style={{ color: menuItemStyles.color }}>ثبت اطلاعات جدید</span>
              </Link>
            </Menu.Item>

            {/* اطلاعات ثبت‌شده (به‌جای آپلود فایل) */}
            <Menu.Item key="2" icon={<DatabaseOutlined />} style={menuItemStyles}>
              <Link to="records">
                <span style={{ color: menuItemStyles.color }}>اطلاعات ثبت‌شده</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main Layout */}
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
              background: darkTheme ? "#001529" : "#fff",
              color: darkTheme ? "#fff" : "#000",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Button onClick={toggleMenu} type="text" style={{ color: "inherit" }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
              <h3 style={{ margin: 0 }}>پنل مدیریت</h3>
            </div>

            <Button onClick={toggleTheme} style={bottomButtonStyle}>
              تغییر به تم {darkTheme ? "روشن" : "تاریک"}
            </Button>
          </Header>

          <Content
            style={{
              margin: "16px",
              background: "#f5f5f5",
              color: "#000",
              borderRadius: "12px",
              padding: 24,
              minHeight: 360,
              boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* Outlet برای صفحات داخلی */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;
