import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000/api';

export const getAllFilms = async () => {
    try {
        const response = await axios.get(`${baseURL}/films/AllFilms`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching films: ' + error.message);
    }
};
