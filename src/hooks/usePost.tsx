import { useState } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';
import { useAuth } from './useAuth';

export function usePost<T = unknown, R = unknown>() {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Initial state should be false
  const [error, setError] = useState<string | null>(null);
  
  const { token } = useAuth();

  // We move the logic into a manual 'execute' function
  const execute = async (url: string, body: T, options?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<R>(url, body, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setData(response.data);
      return response.data; // Return data so you can use it in 'await'
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Post failed';
      setError(msg);
      throw err; // Throw so your handleSubmit can catch it
    } finally {
      setLoading(false);
    }
  };

  return { execute, data, loading, error };
}

