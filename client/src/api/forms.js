import axiosInstance from './axiosInstance';

export async function submitRegistration(formData) {
  try {
    const response = await axiosInstance.post('/api/v1/form/registration', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error;
  }
}

export async function submitContactUs(data) {
  try {
    const response = await axiosInstance.post('/api/v1/form/contact', data);
    return response.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error;
  }
} 