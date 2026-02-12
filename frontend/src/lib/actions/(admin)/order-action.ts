"use server";

import { revalidatePath } from "next/cache";
import { getAllAdminOrders, getAdminOrderById, updateAdminOrderStatus, deleteAdminOrder } from "@/lib/api/(admin)/order";

export const handleGetAllAdminOrders = async (params?: { page?: number; size?: number; status?: string }) => {
    try {
        const result = await getAllAdminOrders(params);
        
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

export const handleGetAdminOrderById = async (id: string) => {
    try {
        const result = await getAdminOrderById(id);
        
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

export const handleUpdateAdminOrderStatus = async (id: string, status: string) => {
    try {
        const result = await updateAdminOrderStatus(id, status);
        
        if (result.success) {
            revalidatePath('/admin/orders');
            revalidatePath(`/admin/orders/${id}`);
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

export const handleDeleteAdminOrder = async (id: string) => {
    try {
        const result = await deleteAdminOrder(id);
        
        if (result.success) {
            revalidatePath('/admin/orders');
            return { 
                success: true, 
                message: result.message || 'Order deleted successfully' 
            };
        }
        
        return { 
            success: false, 
            message: result.message || 'Failed to delete order' 
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.message || 'Failed to delete order' 
        };
    }
};
