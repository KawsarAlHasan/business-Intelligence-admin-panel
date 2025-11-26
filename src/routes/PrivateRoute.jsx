import { Navigate, useLocation } from "react-router-dom";
import { useAdminProfile } from "../api/authApi";
import LoadingComponent from "../components/LoadingComponent";

const PrivateRoute = ({ children }) => {
  const { adminProfile, isLoading, isError, error, refetch } =
    useAdminProfile();

  const location = useLocation();
  const token = localStorage.getItem("token");

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError || error || !adminProfile || !token) {
    localStorage.removeItem("token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
