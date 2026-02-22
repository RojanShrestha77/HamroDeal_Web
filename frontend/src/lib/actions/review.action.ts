'use server'

import { createReview, deleteReview, getProductReviews, getUserReviews, updateReview } from "../api/review";

export async function getProductReviewsAction(productId: string, page: number = 1, size: number = 10) {
    try {
        const result = await getProductReviews(productId, page, size);

        if (result.success) {
            return {
                success: true,
                data: result.data,
                avgRating: result.avgRating,
                pagination: result.pagination
            };
        }
        return { success: false, message: result.message || 'Failed to fetch reviews' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function createReviewAction(productId: string, data: { rating: number; comment: string }) {
    try {
        const result = await createReview(productId, data);

        if (result.success) {
            return {
                success: true,
                message: 'Review created successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to create review' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function getUserReviewsAction() {
    try {
        const result = await getUserReviews();

        if (result.success) {
            return {
                success: true,
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to fetch user reviews' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function updateReviewAction(reviewId: string, data: { rating?: number; comment?: string }) {
    try {
        const result = await updateReview(reviewId, data);

        if (result.success) {
            return {
                success: true,
                message: 'Review updated successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to update review' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function deleteReviewAction(reviewId: string) {
    try {
        const result = await deleteReview(reviewId);

        if (result.success) {
            return {
                success: true,
                message: 'Review deleted successfully'
            };
        }
        return { success: false, message: result.message || 'Failed to delete review' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}
