import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth';
import { Button, Form } from 'react-bootstrap';



const LogInForm = () => {
    const navigate= useNavigate()
    const { login } = useAuth()
    const apiUrl = import.meta.env.VITE_API_URL
  const [formData, setFormData] = useState({ email: '' , password: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


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
    setError(null); 

    try {
      console.log('Form Submitted:', formData);

      
    
      const response = await axios.post(`${apiUrl}/users/login`, formData);
      const token = response.data.token
      const userName = response.data.user.username
      login(token)
      localStorage.setItem('username', userName)
      navigate("/home")
    } catch (err) {
 
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
    <Form onSubmit={handleSubmit}  className='d-flex flex-column justify-content-center gap-3 m-2'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="JohnEmail@email.com" 
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required/>
      </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="**********" 
          id="password"
          name="password"
          value={formData.password}
          minLength={8}
          onChange={handleChange}
          required/>
          <Form.Text className="text-muted">
          Password must be at least 8 characters long!
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" disabled ={isLoading}>
        {isLoading ? 'Registering...' : 'Submit'}
      </Button>
    </Form>
  );
};

export default LogInForm;