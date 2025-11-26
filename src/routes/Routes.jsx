import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../components/NotFound";
import Login from "../pages/authentication/Login";
import LabourCost from "../pages/operations/LabourCost";
import PrivateRoute from "./PrivateRoute";
import CustomerFeedback from "../pages/Customers/CustomerFeedback";
import NoShowAnalysis from "../pages/reservations/no-show-analysis/NoShowAnalysis";
import ProductivityIndex from "../pages/operations/ProductivityIndex";
import Discounts from "../pages/revenue&Finance/Discounts";
import CreditCardFees from "../pages/revenue&Finance/CreditCardFees";
import PaidAdsRoi from "../pages/revenue&Finance/PaidAdsRoi";
import BookedByDashboard from "../pages/reservations/BookedByDashboard";
import GuestSatisfactionIndex from "../pages/Customers/GuestSatisfactionIndex";
import IncomeDashboard from "../pages/revenue&Finance/IncomeDashboard";
import ChannelPerformanceBreakdown from "../pages/operations/ChannelPerformanceBreakdown";
import TipRate from "../pages/reservations/TipRate";
import SalesByErver from "../pages/revenue&Finance/SalesByErver";
import AverageCheckSize from "../pages/reservations/AverageCheckSize";
import LabourCostRate from "../pages/operations/LabourCostRate";
import OrderAnalysis from "../pages/operations/orderAnalysis/OrderAnalysis";
import CustomerInformation from "../pages/Customers/customerInformation/CustomerInformation";
import RegisterWithToken from "../pages/authentication/RegisterWithToken";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import ResetPassword from "../pages/authentication/ResetPassword";
import SACheckoutEventnalysis from "../pages/Customers/SACheckoutEventnalysis";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/register-with-token",
    element: <RegisterWithToken />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: "/",
      //   element: <Dashboard />,
      // },

      // Reservations

      {
        path: "/",
        element: <BookedByDashboard />,
      },

      {
        path: "/average-check-size",
        element: <AverageCheckSize />,
      },

      {
        path: "/no-show-analysis",
        element: <NoShowAnalysis />,
      },

      // Customers

      {
        path: "/guest-satisfaction-index",
        element: <GuestSatisfactionIndex />,
      },
      {
        path: "/ga-checkout-event-analysis",
        element: <SACheckoutEventnalysis />,
      },
      {
        path: "/customer-information",
        element: <CustomerInformation />,
      },
      {
        path: "/customer-feedback",
        element: <CustomerFeedback />,
      },

      // Revenue & Finance
      {
        path: "/income-dashboard",
        element: <IncomeDashboard />,
      },
      {
        path: "/paid-ads-roi",
        element: <PaidAdsRoi />,
      },
      {
        path: "/discounts",
        element: <Discounts />,
      },
      {
        path: "/credit-card-fees",
        element: <CreditCardFees />,
      },
      {
        path: "/sales-by-server",
        element: <SalesByErver />,
      },
      {
        path: "/tip-rate",
        element: <TipRate />,
      },

      // Operations
      {
        path: "/order-analysis",
        element: <OrderAnalysis />,
      },
      {
        path: "/channel-performance-breakdown",
        element: <ChannelPerformanceBreakdown />,
      },
      {
        path: "/productivity-index",
        element: <ProductivityIndex />,
      },
      {
        path: "/labour-cost",
        element: <LabourCost />,
      },
      {
        path: "/labour-cost-rate",
        element: <LabourCostRate />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
