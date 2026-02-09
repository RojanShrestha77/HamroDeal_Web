import { API } from "./endpoints"
import axiosInstance from "./axios"
import { getAuthToken } from "../cookies"

export const register = async (registrationData: any) => {
    try {
        const response = await axiosInstance.post(API.AUTH.REGISTER, registrationData)
        return response.data
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message //mesage from the backend
            || err.message // general exception message
            || 'Registration failed'
        )
    }
}

export const login = async (loginData: any) => {
    try {
        const response = await axiosInstance.post(API.AUTH.LOGIN, loginData);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }

}

export const whoAmI = async () => {
  try {
    const response = await axiosInstance.get(API.AUTH.WHOAMI);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message
      || error.message || 'Whoami failed');
  }
}


export const updateProfile = async (profileData: any) => {
    try {
        const token = await getAuthToken();
        const response = await axiosInstance.put(API.AUTH.UPDATEPROFILE, profileData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || "Updating Profile Failed")
    }
}

export const requestPasswordReset = async (email: string) => {
    try {
        const response = await axiosInstance.post(API.AUTH.REQUEST_PASSWORD_RESET, {email});
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message || error.message || 'Request password reset failed');
    }
};

export const resetPassword = async (token: string, newPassword: string) => {
    try {
        const response = await axiosInstance.post(API.AUTH.RESET_PASSWORD(token), {newPassword: newPassword});
        return response.data; 
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message || error.message|| 'Reset password failed');
    }
}