import { API } from "../endpoints"
import axiosInstance from "../axios";

export const createUser = async (userData: any) => {
    try {
        const response = await axiosInstance.post(API.ADMIN.USER.CREATE, userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }

        });
        return response.data 
        } catch (error: Error | any) {
            throw new Error(
                error.response?.data?.message || error.message || "Create User field",
            )
        }
};

// get all users
export const getAllUsers = async (params? : {page?: number; size?: number; search?: string}) => {
    try {
        const response = await axiosInstance.get(API.ADMIN.USER.GET_ALL, { params });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message || error.message ||"Failed to fetch users"
        );
    }
};

// get one user
export const getOneUser = async (userId: string) => {
    try {
        const response = await axiosInstance.get(API.ADMIN.USER.GET_ONE(userId));
        return response.data;
    } catch (error: Error |any) {
        throw new Error(

            error.response?.data?.message || error.message || "Faield to fetch user"
        )
    }
};

// delete user
export const deleteUser = async (userId: string) => {
    try {
        const response = await axiosInstance.delete(API.ADMIN.USER.DELETE(userId));
        return response.data;
        
    } catch(error: Error | any) {
        throw new Error(
            error.response?.data?.message || error.message || "Failed to delete User"
        );
    }
};

// approve seller
export const approveSeller = async (userId: string) => {
    try {
        const response = await axiosInstance.patch(API.ADMIN.USER.APPROVE_SELLER(userId));
        return response.data;
    } catch (error: Error | any) {
        throw new Error (
            error.repsonse?.data?.message || error.message || "Failed to approve seller"
        );
    }
};

// update user
export const updateUser = async (userId: string, userData: any) => {
    try {
        const response = await axiosInstance.put(API.ADMIN.USER.UPDATE(userId), userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message || error.message || "Failed to update user"
        );
    }
};

export const getUserDetailPage = async (userId: string) => {
    try {
        const response = await axiosInstance.get(API.ADMIN.USER.GET_DETAILS(userId));
        return response.data;
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message || error.message || "Failed to fetch user details"
        );
    }
};
