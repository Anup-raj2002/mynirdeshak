import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as authApi from '../api/auth';


export const authKeys = {
  all: ['auth'],
  profile: () => [...authKeys.all, 'profile'],
  users: () => [...authKeys.all, 'users'],
  usersList: (filters) => [...authKeys.users(), filters],
};


export const useUserProfile = (options = {}) => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authApi.getUserProfile,
    ...options,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
};

export const useUpdateProfileWithPhoto = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ profileData, photoFile }) => 
      authApi.updateUserProfileWithPhoto(profileData, photoFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
};


export const useAllUsers = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: authKeys.usersList(filters),
    queryFn: () => authApi.getAllUsers(filters),
    ...options,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.users() });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.users() });
    },
  });
}; 