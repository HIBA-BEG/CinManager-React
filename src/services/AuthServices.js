import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000/api';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw new Error('Error logging in: ' + error.message);
    }
};
