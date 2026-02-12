import { API } from "./endpoints";
import axiosInstance from "./axios";

export const createOrder = async (orderData: any) => {
    console.log("🌐 createOrder API called");
    console.log("Order Data:", JSON.stringify(orderData, null, 2));
    console.log("Endpoint:", API.ORDERS.CREATE);

    try {
        console.log("📤 Sending POST request...");
        const response = await axiosInstance.post(API.ORDERS.CREATE, orderData);
        console.log("📨 Response received:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("💥 Error in createOrder API:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
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
