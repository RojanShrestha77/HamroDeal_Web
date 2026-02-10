"use server";

import { revalidatePath } from "next/cache";
import { deleteAdminBlog, getAllAdminBlogs, getAdminBlogById } from "@/lib/api/(admin)/blog";

export const handleGetAllBlogs = async (params?: { page?: number; size?: number; search?: string }) => {
    try {
        const response = await getAllAdminBlogs(params);
        return { success: true, data: response.data, pagination: response.pagination };
    } catch (error: any) {
        return { success: false, message: error.message || 'Failed to fetch blogs' };
    }
};

export const handleGetBlogById = async (id: string) => {
    try {
        const response = await getAdminBlogById(id);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.message || 'Failed to fetch blog' };
    }
};

export const handleDeleteBlog = async (id: string) => {
    try {
        const response = await deleteAdminBlog(id);
        revalidatePath('/admin/blogs');
        return { success: true, message: 'Blog deleted successfully' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Failed to delete blog' };
    }
};
