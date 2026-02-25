import { z } from 'zod';

// User schema (for populated fields)
export const UserSchema = z.object({
    _id: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string(),
    imageUrl: z.string().optional(),
});

// Message schema
export const MessageSchema = z.object({
    _id: z.string(),
    conversationId: z.string(),
    senderId: UserSchema,
    receiverId: UserSchema,
    text: z.string(),
    type: z.enum(['text', 'image', 'file']),
    status: z.enum(['sent', 'delivered', 'read']),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Conversation schema
export const ConversationSchema = z.object({
    _id: z.string(),
    otherUser: UserSchema,
    lastMessage: z.object({
        text: z.string(),
        senderId: z.string(),
        timestamp: z.string(),
    }).optional(),
    unreadCount: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Send message schema (for form validation)
export const SendMessageSchema = z.object({
    conversationId: z.string().min(1, "Conversation ID is required"),
    text: z.string().min(1, "Message cannot be empty").max(1000, "Message is too long"),
});

// Create conversation schema
export const CreateConversationSchema = z.object({
    otherUserId: z.string().min(1, "User ID is required"),
});

// Response schemas
export const MessagesResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        messages: z.array(MessageSchema),
        total: z.number(),
        page: z.number(),
        size: z.number(),
        totalPages: z.number(),
    }),
    message: z.string(),
});

export const ConversationsResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        conversations: z.array(ConversationSchema),
        total: z.number(),
        page: z.number(),
        size: z.number(),
        totalPages: z.number(),
    }),
    message: z.string(),
});

export const SingleConversationResponseSchema = z.object({
    success: z.boolean(),
    data: ConversationSchema,
    message: z.string(),
});

export const SingleMessageResponseSchema = z.object({
    success: z.boolean(),
    data: MessageSchema,
    message: z.string(),
});

// Infer types from schemas
export type User = z.infer<typeof UserSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
export type CreateConversationInput = z.infer<typeof CreateConversationSchema>;
export type MessagesResponse = z.infer<typeof MessagesResponseSchema>;
export type ConversationsResponse = z.infer<typeof ConversationsResponseSchema>;
export type SingleConversationResponse = z.infer<typeof SingleConversationResponseSchema>;
export type SingleMessageResponse = z.infer<typeof SingleMessageResponseSchema>;
