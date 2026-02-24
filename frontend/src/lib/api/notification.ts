import axiosInstance from "./axios";
import { API } from "./endpoints";

export const getNotifications = async (page: number = 1, size: number = 20) => {
    try {
        const response = await axiosInstance.get(`${API.NOTIFICATIONS.GET_ALL}?page=${page}&size=${size}`);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get notifications'
        );
    }
};

export const getUnreadCount = async () => {
    try {
        const response = await axiosInstance.get(API.NOTIFICATIONS.GET_UNREAD_COUNT);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to get unread count'
        );
    }
};

export const markNotificationAsRead = async (notificationId: string) => {
    try {
        const response = await axiosInstance.patch(API.NOTIFICATIONS.MARK_AS_READ(notificationId));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to mark as read'
        );
    }
};

export const markAllNotificationsAsRead = async () => {
    try {
        const response = await axiosInstance.patch(API.NOTIFICATIONS.MARK_ALL_AS_READ);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to mark all as read'
        );
    }
};

export const deleteNotification = async (notificationId: string) => {
    try {
        const response = await axiosInstance.delete(API.NOTIFICATIONS.DELETE(notificationId));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to delete notification'
        );
    }
};

export const deleteAllNotifications = async () => {
    try {
        const response = await axiosInstance.delete(API.NOTIFICATIONS.DELETE_ALL);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || err.message || 'Failed to delete all notifications'
        );
    }
};
