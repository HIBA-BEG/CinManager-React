import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem('token');

const axiosAuth = () => {
  const token = getToken();
  return axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getAllSalles = async () => {
  try {
    const response = await axios.get(`${apiUrl}/salles/AllSalles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all salles:', error);
    throw error;
  }
};

export const getSalleById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/salles/One/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching salle:', error);
    throw error;
  }
};

export const addSalle = async (salleData) => {
  try {
    const response = await axiosAuth().post(`${apiUrl}/salles/AddSalle`, salleData);
    return response.data;
  } catch (error) {
    console.error('Error adding new salle:', error);
    throw error;
  }
};

export const updateSalle = async (id, salleData) => {
  try {
    const response = await axiosAuth().put(`${apiUrl}/salles/UpdateSalle/${id}`, salleData);
    return response.data;
  } catch (error) {
    console.error('Error updating salle:', error);
    throw error;
  }
};

export const deleteSalle = async (id) => {
  try {
    const response = await axiosAuth().delete(`${apiUrl}/salles/DeleteSalle/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting salle:', error);
    throw error;
  }
};
