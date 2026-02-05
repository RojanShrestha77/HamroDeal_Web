import axiosInstance from "./axios"
import { API } from "./endpoints"

export const getAllCategories = async() => {
    try {

        const response = await axiosInstance.get(API.CATEGORIES.GET_ALL);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message //mesage from the backend
            || err.message // general exception message
            || 'Failed to get categories'
        )
    }

}