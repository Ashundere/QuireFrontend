import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import type { FormData } from '../../types';



const SignupForm = () => {
    const navigate= useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
  const [formData, setFormData] = useState({ username: '', email: '' , password: ''});
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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevents page reload
//     console.log('Form Submitted:', formData);
//     // Add your signup logic or API call here
//     //POST /users/register
//     await axios.post('/users/register', formData)
//   };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      console.log('Form Submitted:', formData);
      
      // POST request to your backend
      await axios.post(`${apiUrl}/users/register`, formData);
      
      alert('Success! User registered.');
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
      console.error('Registration failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

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
        {isLoading ? 'Registering...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;
