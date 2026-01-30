import axios from 'axios';

// 1. Create an instance with a base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend URL
});

// 2. Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('token'); 

    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
