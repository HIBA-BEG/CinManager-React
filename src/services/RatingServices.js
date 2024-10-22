import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem("token");

const axiosAuth = () => {
  const token = getToken();
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAverageRatingForFilm = async (filmId) => {
  try {
    const response = await axios.get(`${API_URL}/ratings/average/${filmId}`);
    return response.data.averageRating;
  } catch (error) {
    console.error('Error fetching average rating:', error);
    throw error;
  }
};

export const createRating = async (ratingData) => {
  try {
    const response = await axiosAuth().post(`${API_URL}/ratings/AddRating`, ratingData);
    return response.data;
  } catch (error) {
    console.error('Error creating rating:', error);
    throw error;
  }
};

export const updateRating = async (filmId, ratingData) => {
  try {
    const response = await axiosAuth().put(`${API_URL}/ratings/UpdateRating/${filmId}`, ratingData);
    return response.data;
  } catch (error) {
    console.error('Error updating rating:', error);
    throw error;
  }
};

export const getUserRatingForFilm = async (filmId) => {
  try {
    const response = await axiosAuth().get(`${API_URL}/ratings/MyRating/${filmId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('Error fetching user rating:', error);
    throw error;
  }
};
