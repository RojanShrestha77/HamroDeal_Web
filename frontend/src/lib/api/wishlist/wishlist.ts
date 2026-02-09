import axiosInstance from "../axios"
import { API } from "../endpoints"

export const getWishList = async () => {
    try{
        const response = await axiosInstance.get(API.WISHLIST.GET);
        return response.data;
    } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      "Failed to fetch wishlist"
    );
  } 
};

export const addToWishList = async (productId: string) => {
    try {
        const response = await axiosInstance.post(API.WISHLIST.ADD, {
            productId

        });
        return response.data;
    } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      "Failed to add to wishlist"
    );
  }
}

export const removeFromWishList = async (productId: string) => {
    try {
        const response = await axiosInstance.delete(API.WISHLIST.REMOVE(productId));
        return response.data;
    }catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      "Failed to remove from wishlist"
    );
  }

}

export const clearWishlist = async () => {
  try {
    const response = await axiosInstance.delete(API.WISHLIST.CLEAR);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      "Failed to clear wishlist"
    );
  }
};