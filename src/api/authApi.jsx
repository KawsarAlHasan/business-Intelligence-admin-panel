import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

// get admin Profile
export const useAdminProfile = () => {
  const getData = async () => {
    const response = await API.get("/users/me/");
    return response.data;
  };

  const {
    data: adminProfile = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: getData,
  });

  return { adminProfile, isLoading, isError, error, refetch };
};

// sign out
export const signOutAdmin = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
