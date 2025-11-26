import { Avatar, Dropdown, Button, Divider, Tag, Badge, Drawer } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../assets/Group 1597886976.png";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import ChatSupportModel from "./ChatSupportModel";
import { useState } from "react";
import { signOutAdmin, useAdminProfile } from "../api/authApi";
import ChangePassword from "./ChangePassword";
import InviteUser from "./InviteUser";

// import ChangePassword from "./ChangePassword";
// import AccountSetting from "./AccountSetting";

const Navbar = ({ showDrawer }) => {
  const { adminProfile, isLoading, isError, error, refetch } =
    useAdminProfile();

  const [drawerVisible, setDrawerVisible] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // Breadcrumb create
  const generateBreadcrumbItems = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    // If base URL "/", show Dashboard
    if (pathnames.length === 0) {
      return [{ title: "Dashboard", href: "/" }];
    }

    return [
      { title: "", href: "/" },
      ...pathnames.map((value, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        return {
          title: value.charAt(0).toUpperCase() + value.slice(1),
          href: url,
        };
      }),
    ];
  };

  const handleSignOut = () => {
    signOutAdmin();
    navigate("/login");
  };

  const profileMenuItems = [
    {
      key: "adminProfile",
      label: (
        <div className="p-2 cursor-default">
          <div className="flex gap-3 items-start">
            <Avatar
              size={50}
              src={adminProfile?.profile}
              icon={<UserOutlined />}
            />
            <div>
              <h1 className="text-[#242424] text-[16px] font-bold mb-1">
                {adminProfile?.first_name} {adminProfile?.last_name}
              </h1>
              <Tag color="blue" className="m-0">
                Coach
              </Tag>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "invite-user",
      label: <InviteUser />,
    },
    {
      key: "change-password",
      label: <ChangePassword />
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <div
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <LogoutOutlined /> Logout
        </div>
      ),
    },
  ];

  return (
    <div className="w-full px-4 border-b border-gray-200">
      <div className="flex items-center justify-between h-16">
        {/* Left section */}
        <div className="flex items-center lg:hidden">
          <Button
            type="text"
            className="mr-3"
            icon={<MenuOutlined className="text-lg" />}
            onClick={showDrawer}
          />

          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="Logo" className="h-9 w-auto" />
          </Link>
        </div>

        <div>
          {generateBreadcrumbItems().map((item, index) => (
            <div
              className="text-[16px] lg:text-[30px] text-[#222222] font-semibold"
              key={index}
            >
              {item.title}
            </div>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Dropdown
            menu={{ items: profileMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
            overlayStyle={{ width: "300px" }}
          >
            <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Avatar
                size="large"
                src={adminProfile?.profile}
                icon={<UserOutlined />}
                className="border-2 border-gray-200 hover:border-orange-400 transition-colors"
              />
              <div className="hidden md:block ">
                <div className="text-[#242424] text-[14px] font-semibold leading-tight">
                  {adminProfile?.first_name} {adminProfile?.last_name}
                </div>
                <div className="text-[12px] text-gray-500 leading-tight">
                  {adminProfile?.role}
                </div>
              </div>
              <div className="hidden md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
