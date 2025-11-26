import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  RiDashboardLine,
  RiUserStarLine,
  RiUserVoiceLine,
} from "react-icons/ri";
import { MdCalendarMonth, MdOutlineFeedback } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { FaChartLine, FaListUl, FaMoneyBillTrendUp } from "react-icons/fa6";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiTrendingUp } from "react-icons/bi";

import logo from "../assets/Frame 8.png";

const Sidebar = ({ onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/login");
  };

  // Auto–detect selected menu item
  const getSelectedKey = () => [location.pathname];

  const sidebarItems = [
    // DASHBOARD
    {
      key: "/",
      icon: <RiDashboardLine className="w-5 h-5" />,
      label: <Link to="/">Dashboard</Link>,
    },

    // RESERVATIONS GROUP
    {
      type: "group",
      label: "Reservations",
      children: [
        {
          key: "/average-check-size",
          icon: <MdCalendarMonth className="w-5 h-5" />,
          label: <Link to="/average-check-size">Average Check Size</Link>,
        },
        {
          key: "/no-show-analysis",
          icon: <FaChartLine className="w-5 h-5" />,
          label: <Link to="/no-show-analysis">No-Show & Cancellation</Link>,
        },
        {
          key: "/booked-by-dashboard",
          icon: <FaListUl className="w-5 h-5" />,
          label: <Link to="/booked-by-dashboard">Booked By Dashboard</Link>,
        },
      ],
    },

    // CUSTOMERS
    {
      type: "group",
      label: "Customers",
      children: [
        {
          key: "/customer-information",
          icon: <PiBookOpenTextLight className="w-5 h-5" />,
          label: <Link to="/customer-information">Customer Information</Link>,
        },
        {
          key: "/sa-checkout-event-analysis",
          icon: <PiBookOpenTextLight className="w-5 h-5" />,
          label: <Link to="/sa-checkout-event-analysis">GA Checkout Event Analysis</Link>,
        },
        {
          key: "/customer-feedback",
          icon: <MdOutlineFeedback className="w-5 h-5" />,
          label: <Link to="/customer-feedback">Customer Feedback</Link>,
        },
        {
          key: "/guest-satisfaction-index",
          icon: <FaChartLine className="w-5 h-5" />,
          label: (
            <Link to="/guest-satisfaction-index">Guest Satisfaction Index</Link>
          ),
        },
      ],
    },

    // REVENUE & FINANCE
    {
      type: "group",
      label: "Revenue & Finance",
      children: [
        {
          key: "/income-dashboard",
          icon: <GiReceiveMoney className="w-5 h-5" />,
          label: <Link to="/income-dashboard">Income Dashboard</Link>,
        },
        {
          key: "/paid-ads-roi",
          icon: <IoMdAnalytics className="w-5 h-5" />,
          label: <Link to="/paid-ads-roi">Paid Ads ROI</Link>,
        },
        {
          key: "/credit-card-fees",
          icon: <FaMoneyBillTrendUp className="w-5 h-5" />,
          label: <Link to="/credit-card-fees">Credit Card Fees</Link>,
        },
        {
          key: "/discounts",
          icon: <GiReceiveMoney className="w-5 h-5" />,
          label: <Link to="/discounts">Discounts</Link>,
        },
        {
          key: "/tip-rate",
          icon: <GiReceiveMoney className="w-5 h-5" />,
          label: <Link to="/tip-rate">Tip Rate</Link>,
        },
        {
          key: "/sales-by-erver",
          icon: <GiReceiveMoney className="w-5 h-5" />,
          label: <Link to="/sales-by-erver">Sales By Server</Link>,
        },
      ],
    },

    // ORDERS & OPERATIONS
    {
      type: "group",
      label: "Operations",
      children: [
        {
          key: "/order-analysis",
          icon: <BiTrendingUp className="w-5 h-5" />,
          label: (
            <Link to="/order-analysis">
              Order Analysis
            </Link>
          ),
        },
        {
          key: "/channel-performance-breakdown",
          icon: <BiTrendingUp className="w-5 h-5" />,
          label: (
            <Link to="/channel-performance-breakdown">
              Channel Performance Breakdown
            </Link>
          ),
        },
        {
          key: "/productivity-index",
          icon: <BiTrendingUp className="w-5 h-5" />,
          label: (
            <Link to="/productivity-index">Labour Productivity Index</Link>
          ),
        },
        {
          key: "/labour-cost",
          icon: <FaUsers className="w-5 h-5" />,
          label: <Link to="/labour-cost">Labour Cost Dashboard</Link>,
        },
        {
          key: "/labour-cost-rate",
          icon: <FaUsers className="w-5 h-5" />,
          label: <Link to="/labour-cost-rate">Labor Cost Rate</Link>,
        },
      ],
    },
  ];

  return (
    <div className="!bg-[#121212]">
      <div className="flex flex-col ml-6">
        <img src={logo} alt="Logo" className="my-2 hidden lg:block" />
      </div>

      <Menu
        mode="inline"
        selectedKeys={getSelectedKey()}
        items={sidebarItems}
        onClick={onClick}
        style={{
          backgroundColor: "#121212",
          color: "#fff",
        }}
        theme="dark"
      />
    </div>
  );
};

export default Sidebar;
