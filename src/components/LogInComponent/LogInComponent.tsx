import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import type { FormData } from '../../types';



const LogInForm = () => {
    const navigate= useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
  const [formData, setFormData] = useState({ email: '' , password: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handles updates for both input fields dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      console.log('Form Submitted:', formData);
      
      // POST request to your backend
      const response = await axios.post(`${apiUrl}/users/login`, formData);
      const token = response.data.token
      localStorage.setItem('token', token)
      
      alert('Success! Logged In.');
      // Optional: Reset form or redirect
      navigate("/home")
    } catch (err) {
      // TypeScript narrowing for Axios errors
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message || 'Server error occurred';
        setError(serverMessage);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Log In failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
        <div>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging In...' : 'Log In'}
      </button>
    </form>
  );
};

export default LogInForm;