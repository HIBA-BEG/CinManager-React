import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

export const registerUser = async (userData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const response = await axios.post(`${apiUrl}/auth/register`, userData, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message || 'Error registering user');
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, credentials);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error logging in');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
