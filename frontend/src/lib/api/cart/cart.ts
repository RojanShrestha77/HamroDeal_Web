import axiosInstance from "../axios";
import { API } from "../endpoints";


// Add item to cart
export const addToCart = async (productId: string, quantity: number) => {
    try {
        const response = await axiosInstance.post(API.CART.ADD, {
            productId,
            quantity
        });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to add to cart'
        );
    }
};

// Get cart
export const getCart = async () => {
    try {
        const response = await axiosInstance.get(API.CART.GET);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to get cart'
        );
    }
};

// Update cart item quantity
export const updateCartItem = async (productId: string, quantity: number) => {
    try {
        const response = await axiosInstance.put(API.CART.UPDATE(productId), {
            quantity
        });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to update cart'
        );
    }
};

// Remove item from cart
export const removeFromCart = async (productId: string) => {
    try {
        const response = await axiosInstance.delete(API.CART.REMOVE(productId));
        return response.data;
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to remove from cart'
        );
    }
};

// Clear cart
export const clearCart = async () => {
    try {
        const response = await axiosInstance.delete(API.CART.CLEAR);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message 
            || error.message 
            || 'Failed to clear cart'
        );
    }
};
