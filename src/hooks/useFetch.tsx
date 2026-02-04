// import { useState, useEffect } from 'react';
// import axios, {type AxiosRequestConfig } from 'axios';
// import { useAuth } from './useAuth';

// export function useFetch<T = unknown>(url: string | null, options?: AxiosRequestConfig){
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
  

//   const { token } = useAuth();

//   useEffect(() => {
//         if (!url) {
//       setLoading(false);
//       setData(null);
//       return;
//     }
//     const controller = new AbortController();

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get<T>(url, {
//           ...options,
//           signal: controller.signal,
//           headers: {
//             ...options?.headers,

//             Authorization: token ? `Bearer ${token}` : '',
//           },
//         });
//         setData(response.data);
//         setError(null);
//       } catch (err) {
//         if (axios.isCancel(err)) return;
//         setError(axios.isAxiosError(err) ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     return () => controller.abort();
//   }, [url, token]);

//   return { data, loading, error };
// };

import { useState } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';
import { useAuth } from './useAuth';

export function useFetch<R = unknown>() {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const execute = async (url: string, options?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<R>(url, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Fetch failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, data, loading, error };
}