import { useState, useEffect } from 'react';
import axios, {type AxiosRequestConfig } from 'axios';
import { useAuth } from './useAuth';

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig){
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // 1. Get the token from your auth hook
  const { token } = useAuth();

  useEffect(() => {
    const controller = new AbortController(); // To cancel request if component unmounts

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<T>(url, {
          ...options,
          signal: controller.signal,
          headers: {
            ...options?.headers,
            // 2. Automatically attach Bearer token
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(axios.isAxiosError(err) ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup
  }, [url, token]); // Re-run if URL or Auth Token changes

  return { data, loading, error };
};
