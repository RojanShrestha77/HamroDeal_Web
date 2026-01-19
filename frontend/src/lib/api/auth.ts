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
        const response = await axios.post(API.AUTH.LOGIN, loginData);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }

}