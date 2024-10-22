import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem("token");

const axiosAuth = () => {
  const token = getToken();
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/form-data`,
    },
  });
};

export const getAllFilms = async () => {
  try {
    const response = await axiosAuth().get(`${apiUrl}/films/AllFilms`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching films: " + error.message);
  }
};

export const getFilmById = async (id) => {
  try {
    console.log('ID Film:', id); 
    const response = await axios.get(`${apiUrl}/films/One/${id}`);
    console.log('Film data:', response.data); //
    return response.data;
  } catch (error) {
    throw new Error("Error fetching film by ID: " + error.message);
  }
};

export const addFilm = async (data) =>
  {
    console.log(data);
    
    const formData = new FormData();
    formData.append('affiche', data.affiche);
    formData.append('video', data.video);
    formData.append('titre', data.titre);
    formData.append('genre', data.genre);
    formData.append('description', data.description);
    formData.append('duree', data.duree);
    formData.append('dateSortie', data.dateSortie);
    formData.append('status', data.status);
    formData.append('producer', data.producer);
    formData.append('isStreamed', data.isStreamed);
    formData.append('releaseStreamDate', data.releaseStreamDate);

    try {
        const response = await axiosAuth().post(`${apiUrl}/films/AddFilm`, formData);
        return response.data;
    } catch (error) {
        console.error("Error adding film:", error.response || error.message);
        throw error;
    }
};

export const updateFilm = async (id, filmData) => {
  try {
    const response = await axiosAuth().put(
      `${apiUrl}/films/UpdateFilm/${id}`,
      filmData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating film:", error);
    throw error;
  }
};

export const deleteFilm = async (id) => {
  try {
    const response = await axiosAuth().delete(
      `${apiUrl}/films/DeleteFilm/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting film:", error);
    throw error;
  }
};

export const getAllGenres = async () => {
  try {
    const response = await axios.get(`${apiUrl}/genres/AllGenres`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all genres:", error);
    throw error;
  }
};

export const addGenre = async (genreData) => {
  try {
    const response = await axiosAuth().post(
      `${apiUrl}/genres/AddGenre`,
      genreData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new genre:", error);
    throw error;
  }
};

