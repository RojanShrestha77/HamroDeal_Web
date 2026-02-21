import axiosInstance from "../axios";
import { API } from "../endpoints";

export const getAnalyticsOverview = async () => {
  try {
    const response = await axiosInstance.get(API.ADMIN.ANALYTICS.OVERVIEW);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch analytics overview"
    );
  }
};

export const getRevenueData = async (startDate: string, endDate: string) => {
  try {
    const response = await axiosInstance.get(
      `${API.ADMIN.ANALYTICS.REVENUE}?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch revenue data"
    );
  }
};

export const getTopProducts = async (limit: number = 5) => {
  try {
    const response = await axiosInstance.get(
      `${API.ADMIN.ANALYTICS.TOP_PRODUCTS}?limit=${limit}`
    );
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch top products"
    );
  }
};

export const getRecentOrders = async (limit: number = 10) => {
  try {
    const response = await axiosInstance.get(
      `${API.ADMIN.ANALYTICS.RECENT_ORDERS}?limit=${limit}`
    );
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch recent orders"
    );
  }
};

export const getTopSellers = async (limit: number = 5) => {
  try {
    const response = await axiosInstance.get(
      `${API.ADMIN.ANALYTICS.TOP_SELLERS}?limit=${limit}`
    );
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch top sellers"
    );
  }
};
