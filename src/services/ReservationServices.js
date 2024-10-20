import axios from "axios";

const baseURL = "http://127.0.0.1:3000/api";

export const getAvailableSeats = async (seanceId, token) => {
  try {
    const response = await axios.get(
      `${baseURL}/reservations/AvailaibleSeats/${seanceId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching available seats: " + error.message);
  }
};

export const confirmReservation = async (seanceId, selectedSieges) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error("No token found!");
    }

    console.log("Sending data:", { seanceId, sieges: selectedSieges });

    const response = await axios.post(
      `${baseURL}/reservations/AddReservation`,
      {
        seance: seanceId,
        sieges: selectedSieges,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error confirming reservation: " + error.message);
  }
};

export const getUserReservations = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found!");
    }

    const response = await axios.get(
      `${baseURL}/reservations/MyReservations`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user reservations: " + error.message);
  }
};
