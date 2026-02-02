'use server'

import { revalidatePath } from "next/cache";
import { login, register, updateProfile, whoami } from "../api/auth";
import { setAuthToken, setUserData } from "../cookies";
// import { setAuthToken, setUserData } from "../cookie";

export async function handleRegister(registrationData: any) {
    try {
        const result = await register(registrationData);

        if (result.success) {
            return { success: true, message: 'Registration successful', data: result.data };
        }

        return { success: false, message: result.message || 'Registration failed' };

    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export const handleLogin = async (formData: any) => {
    try {
        // how data sent from component to backedn i
        const res = await login(formData);
        // component return logic
        if (res.success) {
            const token = res.token;
            console.log('Received token', token);

            await setAuthToken(token);
            await setUserData(res.data);

            // Also store in localStorage for client-side access
            // localStorage.setItem('token', token);
            // localStorage.setItem('userId', res.data._id);
            // localStorage.setItem('userRole', res.data.role);

            return {
                success: true,
                data: res.data,
                message: 'Login successful'
            };

        }
        return { success: false, message: res.message || 'Login failed' };

    } catch (err: Error | any) {
        return { success: false, message: err.message || 'Login failed' };
    }
}

export async function handleWhoami() {
    try {
        const result = await whoami();

        if(result.success) {
            return {
                success: true,
                message: "message successfull",
                data: result.data,
            };
        }

        return { success: false, message: result.message ?? "Login failed" };


    } catch (err: any){
        return {success: false, message: err.message};
    }
}

export async function handleUpdateProfile(formData: any) {
    try {
        const result = await updateProfile(formData);
        if(result.success) {
            await setUserData(result.data);
            revalidatePath("/user/profile");
            return {
                success: true,
                message: "Profile updated successfully",
                data: result.data,
            };
        }
        return {
            success: false,
            message: result.message || "Profile update failed",
        };
    } catch (err: Error | any) {
        return {succesS: false, message: err.message};

    }
}