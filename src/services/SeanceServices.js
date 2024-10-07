import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; 

export const getAllSeances = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/seances/AllSeances`);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all seances:', error);
        throw error;
    }
};

export const getSeanceById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/seances/One/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching seance with id ${id}:`, error);
        throw error;
    }
};
