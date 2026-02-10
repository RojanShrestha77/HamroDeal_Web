"use server";

import { revalidatePath } from "next/cache";
import { createBlog, updateBlog, getAllBlogs, getBlogById } from "../api/blog";

export const handleGetAllBlogs = async (params?: { page?: number; size?: number; search?: string }) => {
    try {
        const response = await getAllBlogs(params);
        return { success: true, data: response.data, pagination: response.pagination };
    } catch (error: any) {
        return { success: false, message: error.message || 'Failed to fetch blogs' };
    }
};

export const handleGetBlogById = async (id: string) => {
    try {
        const response = await getBlogById(id);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.message || 'Failed to fetch blog' };
    }
};

export const handleCreateBlog = async (data: { title: string; content: string }) => {
    try {
        const response = await createBlog(data);
        revalidatePath('/my-blogs');
        revalidatePath('/blog');
        return { success: true, data: response.data, message: 'Blog created successfully' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Failed to create blog' };
    }
};

export const handleUpdateBlog = async (id: string, data: { title?: string; content?: string }) => {
    try {
        const response = await updateBlog(id, data);
        revalidatePath('/my-blogs');
        revalidatePath(`/blog/${id}`);
        revalidatePath('/blog');
        return { success: true, data: response.data, message: 'Blog updated successfully' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Failed to update blog' };
    }
};
