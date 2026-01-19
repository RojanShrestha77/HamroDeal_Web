'use client'

import { login, register } from "../api/auth";
import { setAuthToken, setUserData } from "../cookies";
// import { setAuthToken, setUserData } from "../cookie";

export async function handleRegister(registrationData: any) {
    try{
        const result = await register(registrationData);

        if (result.success) {
      return { success: true, message: 'Registration successful', data: result.data };
    }

        return { success: false, message: result.message || 'Registration failed' };

    }catch (error: any) {
    return { success: false, message: error.message };
  }
}

export const handleLogin = async (formData: any) => {
    try {
        // how data sent from component to backedn i
        const res = await login(formData);
        // component return logic
        if(res.success){
            const token = res.token;
            console.log('Received token', token);

            await setAuthToken (token);
            await setUserData(res.data);

            return {
                success: true,
                data: res.data,
                message: 'Login successful'
            };
            
        }
        return {success: false, message: res.message || 'Login failed'};

    }catch(err: Error | any) {
        return {success: false, message: err.message || 'Login failed'};
    }
}