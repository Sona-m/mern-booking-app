import { RegisterFormData } from "./pages/Register";
import { LoginData } from "./pages/Login";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const registerUser = async (data: RegisterFormData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/users/register`,
            data, 
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // this tells the browser to set the cookies that we get back on browser from server
            }
        );
        console.log('Response:', response.data);
    } catch (error: any) {
        console.error('Error:', error);
        throw error;
    }
};

export const SignIn = async (data: LoginData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/auth/login`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw error;
    }
};

export const validateToken = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/validate-token`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/logout`, null, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw error;
    }
};
