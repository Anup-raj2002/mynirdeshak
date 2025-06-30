import axiosInstance from './axiosInstance';


export const createTest = async (testData) => {
  const response = await axiosInstance.post('/tests', testData);
  return response.data;
};

export const getTestById = async (testId) => {
  const response = await axiosInstance.get(`/tests/${testId}`);
  return response.data;
};

export const updateTest = async (testId, updateData) => {
  const response = await axiosInstance.patch(`/tests/${testId}`, updateData);
  return response.data;
};

export const deleteTest = async (testId) => {
  const response = await axiosInstance.delete(`/tests/${testId}`);
  return response.data;
};

export const getTests = async (params = {}) => {
  const response = await axiosInstance.get('/tests', { params });
  return response.data;
};


export const addQuestionToTest = async (testId, questionData) => {
  const response = await axiosInstance.post(`/tests/${testId}/questions`, questionData);
  return response.data;
};

export const deleteQuestionFromTest = async (testId, questionId) => {
  const response = await axiosInstance.delete(`/tests/${testId}/questions/${questionId}`);
  return response.data;
};


export const startTestAttempt = async (testId) => {
  const response = await axiosInstance.post(`/tests/${testId}/attempt/start`);
  return response.data;
};

export const submitTestAttempt = async (testId, answers) => {
  const response = await axiosInstance.post(`/tests/${testId}/attempt/submit`, { answers });
  return response.data;
};

export const getTestResult = async (testId) => {
  const response = await axiosInstance.get(`/tests/${testId}/result`);
  return response.data;
};


export const createOrder = async (testId) => {
  const response = await axiosInstance.post(`/tests/${testId}/order`);
  return response.data;
};

export const orderComplete = async (testId, orderId) => {
  const response = await axiosInstance.post(`/tests/${testId}/order/complete?order_id=${orderId}`);
  return response.data;
};


export const grantTestToStudent = async (testId, userId, amount = 0, method = 'GRANT') => {
  const response = await axiosInstance.post(`/tests/${testId}/grant`, {
    userId,
    amount,
    method
  });
  return response.data;
};

export const getTestRankings = async (testId) => {
  const response = await axiosInstance.get(`/tests/${testId}/rankings`);
  return response.data;
};

export const getPublicTestById = async (testId) => {
  const response = await axiosInstance.get(`/tests/public/${testId}`);
  return response.data;
};

export const getPublicTest = async () => {
  const response = await axiosInstance.get(`/tests/public`);
  return response.data;
}; 