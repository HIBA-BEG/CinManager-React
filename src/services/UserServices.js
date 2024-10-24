import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem('token');

const axiosAuth = () => {
  const token = getToken();
  return axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getAllUsers = async () => {
  try {
    const response = await axiosAuth().get(`${apiUrl}/users/AllUsers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};
export const getUser = async (id) => {
  try {
    const response = await axiosAuth().get(`${apiUrl}/users/One/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axiosAuth().put(`${apiUrl}/users/update/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


export const updateProfile = async (id, profileData) => {
  try {
    const response = await axiosAuth().put(`${apiUrl}/users/updateProfile/${id}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const updateSubscription = async (id, subscriptionData) => {
  try {
    const response = await axiosAuth().put(`${apiUrl}/users/updateSubscription/${id}`, subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

export const banUser = async (id) => {
  try {
    const response = await axiosAuth().put(`${apiUrl}/users/ban/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error banning user:', error);
    throw error;
  }
};

export const unbanUser = async (id) => {
  try {
    const response = await axiosAuth().put(`${apiUrl}/users/unban/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error unbanning user:', error);
    throw error;
  }
};

export const getMyProfile = async () => {
  try {
    const response = await axiosAuth().get(`${apiUrl}/users/MyProfile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateMyProfile = async (profileData) => {
  try {
    const response = await axiosAuth().put(`${apiUrl}/users/MyProfile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const deleteMyAccount = async () => {
  try {
    const response = await axiosAuth().delete(`${apiUrl}/users/MyProfile`);
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

export const getStatistics = async () => {  
  try {
    const response = await axiosAuth().get(`${apiUrl}/admin/Statistics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosAuth().delete(`${apiUrl}/admin/DeleteAdmin/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
