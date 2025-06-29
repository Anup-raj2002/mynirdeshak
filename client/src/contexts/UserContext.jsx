import React, { createContext, useContext, useMemo } from "react";
import { useCurrentProfile } from "../queries/useUserQueries";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { profile, loading, error } = useCurrentProfile();
  const value = useMemo(() => ({ profile, loading, error }), [profile, loading, error]);
  return (
    <UserContext.Provider
      value={value}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}