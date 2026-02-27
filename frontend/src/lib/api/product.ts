import axiosInstance from "./axios";
import { API } from "./endpoints";

export const getOneProduct = async (productId: string) => {
    try {
        const response = await axiosInstance.get(API.PRODUCT.GET_ONE(productId));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get product'
        )
    }
}

export const getAllProduct = async () => {
    try {
        const response = await axiosInstance.get(API.PRODUCT.GET_MY);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get products'
        )
    }
}

export const getNewestProducts = async (limit: number = 8) => {
  try {
    const response = await axiosInstance.get(API.PRODUCT.NEWEST, {
      params: { limit }
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to get newest products');
  }
};

export const getTrendingProducts = async (limit: number = 8, days: number = 30) => {
  try {
    const response = await axiosInstance.get(API.PRODUCT.TRENDING, {
      params: { limit, days }
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to get trending products');
  }
};
