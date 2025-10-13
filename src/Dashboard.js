import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, ConfigProvider } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import faIR from "antd/es/locale/fa_IR"; // زبان فارسی

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
    color: darkTheme ? "#fff" : "#000",
    borderColor: darkTheme ? "#444" : "#ddd",
  };

  return (
    <ConfigProvider direction="rtl" locale={faIR}>
      <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
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
            }}
          />
          <Menu theme={theme} mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />} style={menuItemStyles}>
              <Link to="">
                <span style={{ color: menuItemStyles.color }}>صفحه اصلی</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />} style={menuItemStyles}>
              <Link to="movies">
                <span style={{ color: menuItemStyles.color }}>نمودارها</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />} style={menuItemStyles}>
              <Link to="upload">
                <span style={{ color: menuItemStyles.color }}>آپلود فایل</span>
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
              background: darkTheme ? "#141414" : "#f5f5f5",
              color: darkTheme ? "#fff" : "#000",
              borderRadius: "12px",
              padding: 24,
              minHeight: 360,
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
