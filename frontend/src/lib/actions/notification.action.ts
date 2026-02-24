'use server'

import { 
    getNotifications, 
    getUnreadCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification, 
    deleteAllNotifications 
} from "../api/notification";

export async function getNotificationsAction(page: number = 1, size: number = 20) {
    try {
        const result = await getNotifications(page, size);

        if (result.success) {
            return {
                success: true,
                data: result.data,
                pagination: result.pagination
            };
        }
        return { success: false, message: result.message || 'Failed to fetch notifications' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function getUnreadCountAction() {
    try {
        const result = await getUnreadCount();

        if (result.success) {
            return {
                success: true,
                count: result.data.count
            };
        }
        return { success: false, count: 0 };
    } catch (error: Error | any) {
        return { success: false, count: 0 };
    }
}

export async function markNotificationAsReadAction(notificationId: string) {
    try {
        const result = await markNotificationAsRead(notificationId);

        if (result.success) {
            return {
                success: true,
                message: 'Notification marked as read',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to mark as read' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function markAllNotificationsAsReadAction() {
    try {
        const result = await markAllNotificationsAsRead();

        if (result.success) {
            return {
                success: true,
                message: `${result.data.count} notifications marked as read`,
                count: result.data.count
            };
        }
        return { success: false, message: result.message || 'Failed to mark all as read' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function deleteNotificationAction(notificationId: string) {
    try {
        const result = await deleteNotification(notificationId);

        if (result.success) {
            return {
                success: true,
                message: 'Notification deleted successfully'
            };
        }
        return { success: false, message: result.message || 'Failed to delete notification' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function deleteAllNotificationsAction() {
    try {
        const result = await deleteAllNotifications();

        if (result.success) {
            return {
                success: true,
                message: `${result.data.count} notifications deleted`,
                count: result.data.count
            };
        }
        return { success: false, message: result.message || 'Failed to delete all notifications' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}
