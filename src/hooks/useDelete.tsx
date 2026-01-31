import { useState } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';
import { useAuth } from './useAuth';

export function useDelete<R = unknown>() {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const execute = async (url: string, options?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete<R>(url, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Delete failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, data, loading, error };
}
