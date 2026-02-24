import { z } from 'zod';

// Review schema
export const ReviewSchema = z.object({
    _id: z.string(),
    productId: z.string(),
    userId: z.object({
        _id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    }),
    rating: z.number().min(1).max(5),
    comment: z.string().min(10, "Comment must be at least 10 characters").max(500, "Comment must be less than 500 characters"),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Create review schema (for form validation)
export const CreateReviewSchema = z.object({
    rating: z.number().min(1, "Please select a rating").max(5),
    comment: z.string()
        .min(10, "Comment must be at least 10 characters")
        .max(500, "Comment must be less than 500 characters"),
});

// Update review schema
export const UpdateReviewSchema = z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string()
        .min(10, "Comment must be at least 10 characters")
        .max(500, "Comment must be less than 500 characters")
        .optional(),
});

// Response schemas
export const ReviewsResponseSchema = z.object({
    success: z.boolean(),
    data: z.array(ReviewSchema),
    avgRating: z.number(),
    pagination: z.object({
        page: z.number(),
        size: z.number(),
        total: z.number(),
        totalPages: z.number(),
    }),
    message: z.string(),
});

// Infer types from schemas
export type Review = z.infer<typeof ReviewSchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type UpdateReviewInput = z.infer<typeof UpdateReviewSchema>;
export type ReviewsResponse = z.infer<typeof ReviewsResponseSchema>;
