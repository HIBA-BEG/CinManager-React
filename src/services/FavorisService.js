import axios from "axios";

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

export const addFavoris = async (film) => {
  try {
    const response = await axiosAuth().post(`${API_URL}/favoris/AddFavoris`, { film });
    return response.data;
  } catch (error) {
    console.error("Error adding favoris:", error);
    throw error;
  }
};

export const getFavorisByUser = async () => {
  try {
    const response = await axiosAuth().get(`${API_URL}/favoris/MyFavorites`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting favoris:", error);
    throw error;
  }
};

export const checkFavorite = async (filmId) => {
  try {
    const response = await axiosAuth().get(`${API_URL}/favoris/CheckFavorite/${filmId}`);
    return response.data.isFavorite;
  } catch (error) {
    console.error("Error checking favorite:", error);
    throw error;
  }
};

export const deleteFavoris = async (filmId) => {
  try {
    const response = await axiosAuth().delete(`${API_URL}/favoris/DeleteFavoris/${filmId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting favoris:", error);
    throw error;
  }
};
