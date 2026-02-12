"use server";

import { revalidatePath } from "next/cache";
import { getSellerOrders, getSellerOrderById, updateSellerOrderStatus } from "@/lib/api/seller/order";

export const handleGetSellerOrders = async (params?: { page?: number; size?: number }) => {
    try {
        const result = await getSellerOrders(params);
        
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

export const handleGetSellerOrderById = async (id: string) => {
    try {
        const result = await getSellerOrderById(id);
        
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

export const handleUpdateSellerOrderStatus = async (id: string, status: string) => {
    try {
        const result = await updateSellerOrderStatus(id, status);
        
        if (result.success) {
            revalidatePath('/seller/orders');
            revalidatePath(`/seller/orders/${id}`);
            return { 
                success: true, 
                data: result.data, 
                message: result.message || 'Order status updated successfully' 
            };
        }
        
        return { 
            success: false, 
            message: result.message || 'Failed to update order status' 
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.message || 'Failed to update order status' 
        };
    }
};
