import axiosInstance from "./axios";
import { API } from "./endpoints";

export const createOrGetConversation = async (otherUserId: string) => {
    try {
        const response = await axiosInstance.post(API.CONVERSATIONS.CREATE_OR_GET, { otherUserId });
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to create conversation'
        );
    }
};

export const getConversations = async (page: number = 1, size: number = 20) => {
    try {
        const response = await axiosInstance.get(`${API.CONVERSATIONS.GET_ALL}?page=${page}&size=${size}`);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get conversations'
        );
    }
};

export const getConversationById = async (id: string) => {
    try {
        const response = await axiosInstance.get(API.CONVERSATIONS.GET_ONE(id));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get conversation'
        );
    }
};

export const deleteConversation = async (id: string) => {
    try {
        const response = await axiosInstance.delete(API.CONVERSATIONS.DELETE(id));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to delete conversation'
        );
    }
};

export const resetUnreadCount = async (id: string) => {
    try {
        const response = await axiosInstance.patch(API.CONVERSATIONS.RESET_UNREAD(id));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to reset unread count'
        );
    }
};
