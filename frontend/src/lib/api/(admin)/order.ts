import { API } from "../endpoints";
import axiosInstance from "../axios";

export const getAllAdminOrders = async (params?: { page?: number; size?: number; status?: string }) => {
    try {
        const response = await axiosInstance.get(API.ADMIN.ORDERS.GET_ALL, { params });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to fetch orders'
        );
    }
};

export const getAdminOrderById = async (id: string) => {
    try {
        const response = await axiosInstance.get(API.ADMIN.ORDERS.GET_ONE(id));
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to fetch order'
        );
    }
};

export const updateAdminOrderStatus = async (id: string, status: string) => {
    try {
        const response = await axiosInstance.patch(API.ADMIN.ORDERS.UPDATE_STATUS(id), { status });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to update order status'
        );
    }
};

export const deleteAdminOrder = async (id: string) => {
    try {
        const response = await axiosInstance.delete(API.ADMIN.ORDERS.DELETE(id));
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to delete order'
        );
    }
};
