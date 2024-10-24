import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem('token');

const axiosAuth = () => {
  const token = getToken();
  return axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getAllGenres = async () => {
  try {
    const response = await axios.get(`${apiUrl}/genres/AllGenres`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all genres:', error);
    throw error;
  }
};

export const getGenreById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/genres/One/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching genre:', error);
    throw error;
  }
};

export const addGenre = async (genreData) => {
  try {
    const response = await axiosAuth().post(`${apiUrl}/genres/AddGenre`, genreData);
    return response.data;
  } catch (error) {
    console.error('Error adding new genre:', error);
    throw error;
  }
};

export const updateGenre = async (id, genreData) => {
  try {
    const response = await axiosAuth().put(`${apiUrl}/genres/UpdateGenre/${id}`, genreData);
    return response.data;
  } catch (error) {
    console.error('Error updating genre:', error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  try {
    const response = await axiosAuth().delete(`${apiUrl}/genres/DeleteGenre/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting genre:', error);
    throw error;
  }
};

