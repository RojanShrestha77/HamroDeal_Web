import { z } from 'zod';

export const notificationSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  type: z.enum(['order', 'product', 'review', 'system', 'admin']),
  relatedId: z.string().optional(),
  actionUrl: z.string().optional(),
  isRead: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const notificationArraySchema = z.array(notificationSchema);

export const notificationResponseSchema = z.object({
  success: z.boolean(),
  data: notificationArraySchema,
  pagination: z.object({
    page: z.number(),
    size: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }).optional(),
  message: z.string().optional(),
});

export const unreadCountResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    count: z.number(),
  }),
});

// Export types
export type Notification = z.infer<typeof notificationSchema>;
export type NotificationResponse = z.infer<typeof notificationResponseSchema>;
export type UnreadCountResponse = z.infer<typeof unreadCountResponseSchema>;
