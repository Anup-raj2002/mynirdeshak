import axiosInstance from './axiosInstance';

export async function submitRegistration(formData) {
  try {
    const response = await axiosInstance.post('/form/registration', formData);
    return response.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error;
  }
}

export async function submitContactUs(data) {
  try {
    const response = await axiosInstance.post('/form/contact', data);
    return response.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error;
  }
} 