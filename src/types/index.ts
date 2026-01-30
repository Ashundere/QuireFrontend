// 1. Define the structure of your JWT payload
export interface DecodedToken {
  id: string;
  email: string;
  exp: number; // Expiration time (unix timestamp)
  iat?: number;
}

// 2. Define the Context interface
export interface AuthContextType {
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}


export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface FormData {
  username: string;
  email: string;
}