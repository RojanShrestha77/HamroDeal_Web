"use server";

import { revalidatePath } from "next/cache";
import { createOrder, getMyOrders, getOrderById, cancelOrder } from "../api/order";

export const handleCreateOrder = async (orderData: any) => {
    try {
        const result = await createOrder(orderData);
        
        if (result.success) {
            revalidatePath('/orders');
            revalidatePath('/cart');
            return { 
                success: true, 
                data: result.data, 
                message: result.message || 'Order created successfully' 
            };
        }
        
        return { 
            success: false, 
            message: result.message || 'Failed to create order' 
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.message || 'Failed to create order' 
        };
    }
};

export const handleGetMyOrders = async (params?: { page?: number; size?: number }) => {
    try {
        const result = await getMyOrders(params);
        
        if (result.success) {
            return { 
                success: true, 
                data: result.data, 
                pagination: result.pagination,
                message: result.message || 'Orders fetched successfully'
            };
        }
        
        return { 
            success: false, 
            message: result.message || 'Failed to fetch orders' 
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.message || 'Failed to fetch orders' 
        };
    }
};

export const handleGetOrderById = async (id: string) => {
    try {
        const result = await getOrderById(id);
        
        if (result.success) {
            return { 
                success: true, 
                data: result.data,
                message: result.message || 'Order fetched successfully'
            };
        }
        
        return { 
            success: false, 
            message: result.message || 'Failed to fetch order' 
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.message || 'Failed to fetch order' 
        };
    }
};

export const handleCancelOrder = async (id: string) => {
    try {
        const result = await cancelOrder(id);
        
        if (result.success) {
            revalidatePath('/orders');
            revalidatePath(`/orders/${id}`);
            return { 
                success: true, 
                data: result.data, 
                message: result.message || 'Order cancelled successfully' 
            };
        }
        
        return { 
            success: false, 
            message: result.message || 'Failed to cancel order' 
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.message || 'Failed to cancel order' 
        };
    }
};
