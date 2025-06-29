import React, { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/users';

const UserContext = createContext();

export function UserProvider({ children }) {
  const {
    data: user,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
  });

  const value = useMemo(() => ({
    user,
    isLoading,
    error,
    refetch,
    isFetching,
    isAuthenticated: !!user,
  }), [user, isLoading, error, refetch, isFetching]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
} 