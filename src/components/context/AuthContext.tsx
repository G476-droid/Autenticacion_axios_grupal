import React, { createContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }:AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

      setLoading(false);

  }, []);

  return (
    <AuthContext.Provider value={{ loading }}>
      {children}
    </AuthContext.Provider>
  );
};
