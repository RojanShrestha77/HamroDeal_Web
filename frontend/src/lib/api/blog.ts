import { API } from "./endpoints";
import axiosInstance from "./axios";

export const getAllBlogs = async (params?: { page?: number; size?: number; search?: string }) => {
    try {
        const response = await axiosInstance.get(API.BLOGS.GET_ALL, { params });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch blogs');
    }
};

export const getBlogById = async (id: string) => {
    try {
        const response = await axiosInstance.get(API.BLOGS.GET_ONE(id));
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch blog');
    }
};

export const createBlog = async (data: { title: string; content: string }) => {
    try {
        const response = await axiosInstance.post(API.BLOGS.CREATE, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to create blog');
    }
};

export const updateBlog = async (id: string, data: { title?: string; content?: string }) => {
    try {
        const response = await axiosInstance.put(API.BLOGS.UPDATE(id), data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to update blog');
    }
};
