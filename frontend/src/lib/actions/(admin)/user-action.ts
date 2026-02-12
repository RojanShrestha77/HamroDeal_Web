"use server";
import { approveSeller, createUser, deleteUser, getAllUsers } from "@/lib/api/(admin)/user";
import { revalidatePath } from "next/cache";

/** CREATE USER */
export const handleCreateUser = async (data: FormData) => {
    try {
        const response = await createUser(data);

        if (response.success) {
            revalidatePath("/admin/users");
            return {
                success: true,
                message: "Registration successful",
                data: response.data,
            };
        }

        return {
            success: false,
            message: response.message || "Registration failed",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Registration action failed",
        };
    }
};

/** GET ALL USERS */
export const getAllUsersAction = async () => {
    try {
        const response = await getAllUsers();

        if (response.success) {
            return {
                success: true,
                message: "Users fetched successfully",
                data: response.data,
            };
        }

        return {
            success: false,
            message: response.message || "Failed to fetch users",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch users",
        };
    }
};

/** APPROVE SELLER */
export const approveSellerAction = async (userId: string) => {
    try {
        const response = await approveSeller(userId);

        if (response.success) {
            revalidatePath("/admin/users");
            return {
                success: true,
                message: "Seller approved successfully",
                data: response.data,
            };
        }

        return {
            success: false,
            message: response.message || "Failed to approve seller",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to approve seller",
        };
    }
};

/** DELETE USER */
export const deleteUserAction = async (userId: string) => {
    try {
        const response = await deleteUser(userId);

        if (response.success) {
            revalidatePath("/admin/users");
            return {
                success: true,
                message: "User deleted successfully",
            };
        }

        return {
            success: false,
            message: response.message || "Failed to delete user",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to delete user",
        };
    }
};
