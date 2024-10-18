import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem("token");

const axiosAuth = () => {
  const token = getToken();
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      ['Content-Type']: `multipart/form-data`,
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

export const addFilm = async (filmData) => {
  // console.log(filmData);
  try {
    const formData = new FormData();

    Object.keys(filmData).forEach((key) => {
      if (key === "affiche" || key === "video") {
        if (filmData[key]) formData.append(key, filmData[key]);
      } else {
        formData.append(key, JSON.stringify(filmData[key]));
      }
    });
    // console.log(formData);
    
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    const response = await axiosAuth().post(
      `${apiUrl}/films/AddFilm`,
      formData,
     
    );
    // console.log("response: ", response);
    return response.data;
  } catch (error) {
    console.error("Error adding new film:", error);
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
