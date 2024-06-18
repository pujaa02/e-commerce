// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const register = async (username, password) => {
    return axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
