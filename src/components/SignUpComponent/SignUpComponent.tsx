import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button, Form } from 'react-bootstrap';



const SignupForm = () => {
    const navigate= useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
  const [formData, setFormData] = useState({ username: '', email: '' , password: ''});
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
      

      await axios.post(`${apiUrl}/users/register`, formData);
      
      alert('Success! User registered.');

      navigate("/home")
    } catch (err) {

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
    <Form onSubmit={handleSubmit}  className='d-flex flex-column justify-content-center gap-3 m-2'>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="CoolUsername123" 
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required/>
          <Form.Text className="text-muted">
          Create something unique!
        </Form.Text>
      </Form.Group>
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
          <Form.Text className="text-muted">
          We will never share your email!
        </Form.Text>
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


export default SignupForm;
