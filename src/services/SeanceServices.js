import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem('token');

const axiosAuth = () => {
  const token = getToken();
  return axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getAllSeances = async () => {
    try {
        const response = await axios.get(`${apiUrl}/seances/AllSeances`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all seances:', error);
        throw error;
    }
};

export const getSeanceById = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/seances/One/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seance:', error);
        throw error;
    }
};

export const addSeance = async (seanceData) => {
    try {
        const response = await axiosAuth().post(`${apiUrl}/seances/AddSeance`, seanceData);
        return response.data;
    } catch (error) {
        console.error('Error adding new seance:', error);
        throw error;
    }
};

export const deleteSeance = async (id) => {
    try {
        const response = await axiosAuth().delete(`${apiUrl}/seances/DeleteSeance/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching seance with id ${id}:`, error);
        throw error;
    }
};
