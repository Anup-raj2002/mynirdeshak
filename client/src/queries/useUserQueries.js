import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as userApi from '../api/users';
import { useNotification } from '../contexts/NotificationContext';
import { auth } from '../utils/firebaseConfig';

export const authKeys = {
  all: ['auth'],
  profile: () => [...authKeys.all, 'profile'],
  users: () => [...authKeys.all, 'users'],
  usersList: (filters) => [...authKeys.users(), filters],
};

export function useCurrentProfile() {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setFirebaseLoading(false);
      if (!user) {
        queryClient.removeQueries({ queryKey: authKeys.profile() });
      }
    });
    return () => unsubscribe();
  }, [queryClient]);

  const { data, isLoading, error } = useQuery({
    queryKey: authKeys.profile(),
    queryFn: userApi.getProfile,
    enabled: firebaseLoading === false && !!firebaseUser,
    retry: 1,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    onError: (err) => {
      showNotification("Failed to fetch user profile", "error");
    },
  });

  const loading = firebaseLoading || isLoading;
  const profile = firebaseUser ? data : null;

  return { profile, loading, error };
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
      showNotification("Profile updated successfully!", "success");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile.";
      showNotification(errorMessage, "error");
    },
  });
};

export const useAllUsers = (filters = {}, options = {}) => {
  const { showNotification } = useNotification();
  return useQuery({
    queryKey: authKeys.usersList(filters),
    queryFn: () => userApi.getUsers(filters),
    ...options,
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to fetch users.";
      showNotification(errorMessage, "error");
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  return useMutation({
    mutationFn: userApi.addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.users() });
      showNotification("User created successfully!", "success");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to create user.";
      showNotification(errorMessage, "error");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.users() });
      showNotification("User deleted successfully!", "success");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to delete user.";
      showNotification(errorMessage, "error");
    },
  });
}; 