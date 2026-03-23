import api from './axios';
import { AuthResponse } from '../types';

export const authApi = {
    register: async (data: {
        email: string;
        name: string;
        password: string;
        role: string;
    }): Promise<AuthResponse> => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    login: async (data: {
        email: string;
        password: string;
    }): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    logout: async (userId: string): Promise<void> => {
        await api.post('/auth/logout', { userId });
    },
};