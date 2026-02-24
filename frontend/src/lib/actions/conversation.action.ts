'use server'

import { createOrGetConversation, deleteConversation, getConversationById, getConversations, resetUnreadCount } from "../api/conversation";

export async function createOrGetConversationAction(otherUserId: string) {
    try {
        const result = await createOrGetConversation(otherUserId);

        if (result.success) {
            return {
                success: true,
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to create conversation' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function getConversationsAction(page: number = 1, size: number = 20) {
    try {
        const result = await getConversations(page, size);

        if (result.success) {
            return {
                success: true,
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to get conversations' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function getConversationByIdAction(id: string) {
    try {
        const result = await getConversationById(id);

        if (result.success) {
            return {
                success: true,
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to get conversation' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function deleteConversationAction(id: string) {
    try {
        const result = await deleteConversation(id);

        if (result.success) {
            return {
                success: true,
                message: 'Conversation deleted successfully'
            };
        }
        return { success: false, message: result.message || 'Failed to delete conversation' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function resetUnreadCountAction(id: string) {
    try {
        const result = await resetUnreadCount(id);

        if (result.success) {
            return {
                success: true,
                message: 'Unread count reset successfully'
            };
        }
        return { success: false, message: result.message || 'Failed to reset unread count' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}
