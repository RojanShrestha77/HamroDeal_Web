import { API } from "../endpoints";
import axiosInstance from "../axios";

export const getAllAdminBlogs = async (params?: { page?: number; size?: number; search?: string }) => {
    try {
        const response = await axiosInstance.get(API.ADMIN.BLOGS.GET_ALL, { params });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch blogs');
    }
};

export const getAdminBlogById = async (id: string) => {
    try {
        const response = await axiosInstance.get(API.ADMIN.BLOGS.GET_ONE(id));
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch blog');
    }
};

export const deleteAdminBlog = async (id: string) => {
    try {
        const response = await axiosInstance.delete(API.ADMIN.BLOGS.DELETE(id));
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to delete blog');
    }
};
