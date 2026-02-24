'use server'

import { deleteMessage, getMessages, markMessagesAsRead, sendMessage } from "../api/message";

export async function sendMessageAction(data: { conversationId: string; text: string }) {
    try {
        const result = await sendMessage(data);

        if (result.success) {
            return {
                success: true,
                message: 'Message sent successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to send message' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function getMessagesAction(conversationId: string, page: number = 1, size: number = 50) {
    try {
        const result = await getMessages(conversationId, page, size);

        if (result.success) {
            return {
                success: true,
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to get messages' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function deleteMessageAction(id: string) {
    try {
        const result = await deleteMessage(id);

        if (result.success) {
            return {
                success: true,
                message: 'Message deleted successfully'
            };
        }
        return { success: false, message: result.message || 'Failed to delete message' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function markMessagesAsReadAction(conversationId: string) {
    try {
        const result = await markMessagesAsRead(conversationId);

        if (result.success) {
            return {
                success: true,
                message: 'Messages marked as read'
            };
        }
        return { success: false, message: result.message || 'Failed to mark messages as read' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}
