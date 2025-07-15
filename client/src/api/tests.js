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

export const getTests = async () => {
  const response = await axiosInstance.get('/tests');
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

export const uploadTestResult = async (testId, rows) => {
  const response = await axiosInstance.post(`/tests/${testId}/result`, { rows });
  return response.data;
};

export const createOrder = async (phone) => {
  const response = await axiosInstance.post(`/tests/order`, {phone});
  return response.data;
};

export const checkPaymentStatus = async (orderId) => {
  const response = await axiosInstance.get(`/tests/order?order_id=${orderId}`);
  return response.data;
};

export const getTestRankings = async (testId) => {
  const response = await axiosInstance.get(`/tests/${testId}/rankings`, { responseType: 'blob' });
  return response;
};

export const grantStudent = async ({ uid, amount }) => {
  const response = await axiosInstance.post('/tests/grant', { uid, amount });
  return response.data;
};

export const getExamSessions = async () => {
  const response = await axiosInstance.get('/tests/sessions');
  return response.data;
};

export const createExamSession = async (sessionData) => {
  const response = await axiosInstance.post('/tests/sessions', sessionData);
  return response.data;
};

export const downloadScoreCard = async (testId) => {
  const response = await axiosInstance.get(`/tests/${testId}/result/scorecard`, { responseType: 'blob' });
  return response;
}; 