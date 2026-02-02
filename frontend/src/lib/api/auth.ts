import axios from "axios"
import { API } from "./endpoints"
import axiosInstance from "./axios"

export const register = async (registrationData: any) => {
    try {
        const response = await axiosInstance.post(API.AUTH.REGISTER, registrationData)
        return response.data
    } catch(err: Error | any) {
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

export const whoami = async () => {
    try {
        const response = await axios.get(API.AUTH.WHOAMI);
        return response.data;

    } catch (err: Error | any) {
        throw  new Error(err.response?.data?.message || "Fetching User Data Failed");
    }
}

export const updateProfile = async (profileData: any) => {
    try {
        const response = await axios.put(API.AUTH.UPDATEPROFILE, profileData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || "Updating Profile Failed")
    }
}