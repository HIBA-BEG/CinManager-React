import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem('token');

const axiosAuth = () => {
    const token = getToken();
    return axios.create({
      baseURL: `${apiUrl}/commentaires`,
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  };

export const getCommentairesByFilm = async (filmId) => {
  try {
    const response = await axios.get(`${apiUrl}/commentaires/AllComments/${filmId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const createCommentaire = async (commentData) => {
  try {
    console.log('Sending comment data:', commentData);
    // console.log('API URL:', `${apiUrl}/commentaires/AddComment`);
    const response = await axiosAuth().post(`/AddComment`, commentData);
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const deleteCommentaire = async (commentId) => {
  try {
    const response = await axiosAuth().delete(`/DeleteComment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
