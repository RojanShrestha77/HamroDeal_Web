import axiosInstance from "./axios";
import { API } from "./endpoints";

export const sendMessage = async (data: { conversationId: string; text: string }) => {
    try {
        const response = await axiosInstance.post(API.MESSAGES.SEND, data);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to send message'
        );
    }
};

export const getMessages = async (conversationId: string, page: number = 1, size: number = 50) => {
    try {
        const response = await axiosInstance.get(`${API.MESSAGES.GET_BY_CONVERSATION(conversationId)}?page=${page}&size=${size}`);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get messages'
        );
    }
};

export const deleteMessage = async (id: string) => {
    try {
        const response = await axiosInstance.delete(API.MESSAGES.DELETE(id));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to delete message'
        );
    }
};

export const markMessagesAsRead = async (conversationId: string) => {
    try {
        const response = await axiosInstance.patch(API.MESSAGES.MARK_AS_READ(conversationId));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to mark messages as read'
        );
    }
};
