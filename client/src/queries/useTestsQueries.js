import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as testApi from '../api/tests';
import { useNotification } from '../contexts/NotificationContext';


export const testKeys = {
  all: ['tests'],
  lists: () => [...testKeys.all, 'list'],
  list: (filters) => [...testKeys.lists(), filters],
  details: () => [...testKeys.all, 'detail'],
  detail: (id) => [...testKeys.details(), id],
  rankings: (id) => [...testKeys.detail(id), 'rankings'],
  results: (id) => [...testKeys.detail(id), 'results'],
  payment: (orderId) => ['payment', orderId],
};

export const useTests = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: testKeys.list(filters),
    queryFn: () => testApi.getTests(filters),
    ...options,
  });
};

export const useTestById = (testId, options = {}) => {
  return useQuery({
    queryKey: testKeys.detail(testId),
    queryFn: () => testApi.getTestById(testId),
    enabled: !!testId,
    ...options,
  });
};

export const useCreateTest = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  
  return useMutation({
    mutationFn: testApi.createTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testKeys.lists() });
      showNotification('Test created successfully!', 'success');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create test.';
      showNotification(errorMessage, 'error');
    },
  });
};

export const useUpdateTest = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  
  return useMutation({
    mutationFn: ({ testId, updateData }) => testApi.updateTest(testId, updateData),
    onSuccess: (data, { testId }) => {
      queryClient.invalidateQueries({ queryKey: testKeys.detail(testId) });
      queryClient.invalidateQueries({ queryKey: testKeys.lists() });
      showNotification('Test updated successfully!', 'success');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update test.';
      showNotification(errorMessage, 'error');
    },
  });
};

export const useDeleteTest = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  
  return useMutation({
    mutationFn: testApi.deleteTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testKeys.lists() });
      showNotification('Test deleted successfully!', 'success');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete test.';
      showNotification(errorMessage, 'error');
    },
  });
};


export const useAddQuestionToTest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ testId, questionData }) => testApi.addQuestionToTest(testId, questionData),
    onSuccess: (data, { testId }) => {
      queryClient.invalidateQueries({ queryKey: testKeys.detail(testId) });
    },
  });
};

export const useDeleteQuestionFromTest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ testId, questionId }) => testApi.deleteQuestionFromTest(testId, questionId),
    onSuccess: (data, { testId }) => {
      queryClient.invalidateQueries({ queryKey: testKeys.detail(testId) });
    },
  });
};


export const useStartTestAttempt = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: testApi.startTestAttempt,
    onSuccess: (data, testId) => {
      queryClient.invalidateQueries({ queryKey: testKeys.detail(testId) });
    },
  });
};

export const useSubmitTestAttempt = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ testId, answers }) => testApi.submitTestAttempt(testId, answers),
    onSuccess: (data, { testId }) => {
      queryClient.invalidateQueries({ queryKey: testKeys.results(testId) });
      queryClient.invalidateQueries({ queryKey: testKeys.detail(testId) });
    },
  });
};

export const useTestResult = (testId, options = {}) => {
  return useQuery({
    queryKey: testKeys.results(testId),
    queryFn: () => testApi.getTestResult(testId),
    enabled: !!testId,
    ...options,
  });
};


export const useCreateOrder = () => {
  return useMutation({
    mutationFn: testApi.createOrder,
  });
};

export const useCheckPaymentStatus = (orderId) => {  
  return useQuery({
    queryKey: testKeys.payment(orderId),
    queryFn: () => testApi.checkPaymentStatus(orderId),
    enabled: !!orderId,
  });
};

export const useGrantTestToStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ testId, userId, amount, method }) => 
      testApi.grantTestToStudent(testId, userId, amount, method),
    onSuccess: (data, { testId }) => {
      queryClient.invalidateQueries({ queryKey: testKeys.detail(testId) });
    },
  });
};

export const useTestRankings = (testId, options = {}) => {
  return useQuery({
    queryKey: testKeys.rankings(testId),
    queryFn: () => testApi.getTestRankings(testId),
    enabled: !!testId,
    ...options,
  });
};

export const usePublicTestById = (testId, options = {}) => {
  return useQuery({
    queryKey: ['publicTest', testId],
    queryFn: () => testApi.getPublicTestById(testId),
    enabled: !!testId,
    ...options,
  });
};

export const usePublicTests = (options = {}) => {
  return useQuery({
    queryKey: ['publicTests'],
    queryFn: () => testApi.getPublicTest(),
    ...options,
  });
}; 