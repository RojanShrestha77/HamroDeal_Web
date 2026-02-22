import axiosInstance from "./axios";
import { API } from "./endpoints";

export const getProductReviews = async (productId: string, page: number = 1, size: number = 10) => {
    try {
        const response = await axiosInstance.get(`${API.REVIEWS.GET_PRODUCT_REVIEWS(productId)}?page=${page}&size=${size}`);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get reviews'
        );
    }
};

export const createReview = async (productId: string, data: { rating: number; comment: string }) => {
    try {
        const response = await axiosInstance.post(API.REVIEWS.CREATE(productId), data);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to create review'
        );
    }
};

export const getUserReviews = async () => {
    try {
        const response = await axiosInstance.get(API.REVIEWS.GET_MY_REVIEWS);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get user reviews'
        );
    }
};

export const updateReview = async (reviewId: string, data: { rating?: number; comment?: string }) => {
    try {
        const response = await axiosInstance.patch(API.REVIEWS.UPDATE(reviewId), data);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to update review'
        );
    }
};

export const deleteReview = async (reviewId: string) => {
    try {
        const response = await axiosInstance.delete(API.REVIEWS.DELETE(reviewId));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to delete review'
        );
    }
};
