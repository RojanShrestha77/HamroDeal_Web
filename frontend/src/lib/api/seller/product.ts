import axiosInstance from "../axios"
import { API } from "../endpoints"

export const createProduct = async (data: any) => {
    try {
        const response = await axiosInstance.post(API.PRODUCT.CREATE, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;

    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message //mesage from the backend
            || err.message // general exception message
            || 'Failed to create product'
        )

    }
};

export const getMyProducts = async () => {
    try {
        const response = await axiosInstance.get(API.PRODUCT.GET_MY_PRODUCTS);
        return response.data
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message //mesage from the backend
            || err.message // general exception message
            || 'Failed to get product'
        )

    }
}

export const updateProducts = async (id: string, data: any) => {
    try {
        const response = await axiosInstance.patch(API.PRODUCT.UPDATE(id), data);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message //mesage from the backend
            || err.message // general exception message
            || 'Failed to update product'
        )

    }
}

export const deleteProducts = async (id: string) => {
    try {
        const response = await axiosInstance.delete(API.PRODUCT.DELETE(id));
        return response.data
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message //mesage from the backend
            || err.message // general exception message
            || 'Failed to delete product'
        )

    }
}