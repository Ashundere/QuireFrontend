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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode<DecodedToken>(token);
    setUser(decoded);
    setIsAuthenticated(true)

  };

  const token = localStorage.getItem("token")
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("username")
    setIsAuthenticated(false)
    setUser(null);
    navigate("/")
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, token, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};