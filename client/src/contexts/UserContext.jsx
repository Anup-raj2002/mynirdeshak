import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '../api/users';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { logout as firebaseLogout } from '../api/auth';

const UserContext = createContext();

export function UserProvider({ children }) {
  const queryClient = useQueryClient();

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        queryClient.removeQueries(['user', 'profile']);
      }
    });
    return unsubscribe;
  }, [queryClient]);

  const handleLogout = async () => {
    await firebaseLogout();
    queryClient.removeQueries(['user', 'profile']);
  };

  const value = useMemo(() => ({
    user,
    isLoading,
    error,
    refetch,
    isFetching,
    isAuthenticated: !!user,
    logout: handleLogout,
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