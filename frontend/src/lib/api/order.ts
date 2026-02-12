import { API } from "./endpoints";
import axiosInstance from "./axios";

export const createOrder = async (orderData: any) => {
    try {
        const response = await axiosInstance.post(API.ORDERS.CREATE, orderData);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to create order'
        );
    }
};

export const getMyOrders = async (params?: { page?: number; size?: number }) => {
    try {
        const response = await axiosInstance.get(API.ORDERS.GET_MY_ORDERS, { params });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to fetch orders'
        );
    }
};

export const getOrderById = async (id: string) => {
    try {
        const response = await axiosInstance.get(API.ORDERS.GET_ONE(id));
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to fetch order'
        );
    }
};

export const cancelOrder = async (id: string) => {
    try {
        const response = await axiosInstance.patch(API.ORDERS.CANCEL(id));
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to cancel order'
        );
    }
};
