import axios from 'axios';
import { User } from '../../types';

const API_URL = '/api/auth';

export const AuthService = {
  register: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  login: async (credentials: { 
    usernameOrEmail: string; 
    password: string 
  }): Promise<User> => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axios.post(`${API_URL}/logout`);
  },
};
