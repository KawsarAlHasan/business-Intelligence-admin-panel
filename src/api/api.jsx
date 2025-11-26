import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// export const BASE_URL = "https://bi.dsrt321.online";
export const BASE_URL = "http://10.10.7.97:9000";

export const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global API Call
export const useGlobalApi = ({
  endPoint,
  start_date = "",
  end_date = "",
  group_by,
  discount_name,
}) => {
  const getData = async () => {
    const response = await API.get(`${endPoint}`, {
      params: {
        start_date,
        end_date,
        group_by,
        discount_name,
      },
    });

    return response.data;
  };

  const {
    data: globalData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["globalData", start_date, end_date, group_by, discount_name],
    queryFn: getData,
  });

  return { globalData, isLoading, isError, error, refetch };
};
