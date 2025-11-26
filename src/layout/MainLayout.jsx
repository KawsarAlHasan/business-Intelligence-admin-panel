import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Drawer, Button } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AiChat from "../components/aiChat/AiChat";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();

  // Breadcrumb create
  const generateBreadcrumbItems = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return [
      { title: "Dashboard", href: "/" },
      ...pathnames.map((value, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        return {
          title: value.charAt(0).toUpperCase() + value.slice(1),
          href: url,
        };
      }),
    ];
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      {/* Header */}
      {/* <Header className="bg-[#FFFFFF] sticky top-0 z-10 w-full flex items-center p-0 h-20">
      </Header> */}

      <Layout>
        {isLargeScreen && (
          <Sider
            className="hidden lg:block h-screen fixed left-0"
            width={330}
            style={{
              backgroundColor: "#121212",
              // backgroundColor: "#FFFFFF",
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              insetInlineStart: 0,
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
            }}
          >
            <Sidebar />
          </Sider>
        )}

        <Drawer
          title="Navigation"
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          styles={{
            body: { padding: 0 },
          }}
        >
          <Sidebar onClick={closeDrawer} />
        </Drawer>

        <Layout style={{ marginLeft: isLargeScreen ? 320 : 0 }}>
          <Navbar showDrawer={showDrawer} />
          <Content>
            <div className="p-2 lg:px-8  min-h-[93vh] main-bg">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>

      <div className="fixed bottom-10 right-4">
        <AiChat />
      </div>
    </Layout>
  );
};

export default MainLayout;
