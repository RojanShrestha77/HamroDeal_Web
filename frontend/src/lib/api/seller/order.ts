import { API } from "../endpoints";
import axiosInstance from "../axios";

export const getSellerOrders = async (params?: { page?: number; size?: number }) => {
    try {
        const response = await axiosInstance.get(API.SELLER.ORDERS.GET_ALL, { params });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to fetch orders'
        );
    }
};

export const getSellerOrderById = async (id: string) => {
    try {
        const response = await axiosInstance.get(API.SELLER.ORDERS.GET_ONE(id));
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to fetch order'
        );
    }
};

export const updateSellerOrderStatus = async (id: string, status: string) => {
    try {
        const response = await axiosInstance.patch(API.SELLER.ORDERS.UPDATE_STATUS(id), { status });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to update order status'
        );
    }
};
