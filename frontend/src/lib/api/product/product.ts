import axiosInstance from "../axios"
import { API } from "../endpoints"

export const getOneProduct = async (productId: string) => {
    try {
        const response = await axiosInstance.get(API.PRODUCT.GET_ONE(productId));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get product'
        )
    }
}

export const getAllProduct = async () => {
    try {
        const response = await axiosInstance.get(API.PRODUCT.GET_MY);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get products'
        )
    }
}