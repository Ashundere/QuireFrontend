import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthContextType, DecodedToken } from '../types';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);

        if (decoded.exp * 1000 < Date.now()) {
          handleLogout();
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("Invalid token", error);
        handleLogout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode<DecodedToken>(token);
    setUser(decoded);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("username");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout: handleLogout, loading, token, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};