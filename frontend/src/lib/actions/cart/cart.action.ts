'use server'

import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from "@/lib/api/cart/cart";
import { revalidatePath } from "next/cache";

export async function handleAddToCart(productId: string, quantity: number) {
    console.log("🔧 handleAddToCart (server action) called");
    console.log("Product ID:", productId);
    console.log("Quantity:", quantity);

    try {
        console.log("🌐 Calling addToCart API...");
        const result = await addToCart(productId, quantity);

        console.log("📨 API result:", result);

        if (result.success) {
            console.log("✅ API success - revalidating path");
            revalidatePath('/cart');
            return {
                success: true,
                message: 'Item added to cart successfully',
                data: result.data
            };
        }

        console.log("❌ API returned error");
        return {
            success: false,
            message: result.message || 'Failed to add to cart'
        };

    } catch (error: Error | any) {
        console.error("💥 Error in handleAddToCart:", error);
        return {
            success: false,
            message: error.message
        };
    }
}

export async function handleGetCart() {
    try {
        const result = await getCart();

        if (result.success) {
            return {
                success: true,
                message: 'Cart retrieved successfully',
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || 'Failed to get cart'
        };

    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message
        };
    }
}

export async function handleUpdateCartItem(productId: string, quantity: number) {
    try {
        const result = await updateCartItem(productId, quantity);

        if (result.success) {
            revalidatePath('/cart');
            return {
                success: true,
                message: 'Cart updated successfully',
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || 'Failed to update cart'
        };

    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message
        };
    }
}

export async function handleRemoveFromCart(productId: string) {
    try {
        const result = await removeFromCart(productId);

        if (result.success) {
            revalidatePath('/cart');
            return {
                success: true,
                message: 'Item removed from cart',
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || 'Failed to remove item'
        };

    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message
        };
    }
}

export async function handleClearCart() {
    try {
        const result = await clearCart();

        if (result.success) {
            revalidatePath('/cart');
            return {
                success: true,
                message: 'Cart cleared successfully',
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || 'Failed to clear cart'
        };

    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message
        };
    }
}
