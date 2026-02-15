"use server";


import { revalidatePath } from "next/cache";
import { addToWishList, clearWishlist, getWishList, removeFromWishList } from "../api/wishlist";

// get the wishlist
export const getWishlistAction = async () => {
  try {
    const response = await getWishList();

    if (response.success) {
      return {
        success: true,
        message: "Wishlist fetched successfully",
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message || "Failed to fetch wishlist",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch wishlist",
    };
  }
};

// add to the wishlist
export const addToWishlistAction = async (productId: string) => {
  try {
    const response = await addToWishList(productId);

    if (response.success) {
      revalidatePath("/wishlist");
      revalidatePath("/products");
      return {
        success: true,
        message: "Product added to wishlist successfully",
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message || "Failed to add to wishlist",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to add to wishlist",
    };
  }
};

// remove from teh wishglist
export const removeFromWishlistAction = async (productId: string) => {
  try {
    const response = await removeFromWishList(productId);

    if (response.success) {
      revalidatePath("/wishlist");
      revalidatePath("/products");
      return {
        success: true,
        message: "Product removed from wishlist successfully",
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message || "Failed to remove from wishlist",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to remove from wishlist",
    };
  }
};

/** CLEAR WISHLIST */
export const clearWishlistAction = async () => {
  try {
    const response = await clearWishlist();

    if (response.success) {
      revalidatePath("/wishlist");
      return {
        success: true,
        message: "Wishlist cleared successfully",
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message || "Failed to clear wishlist",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to clear wishlist",
    };
  }
};