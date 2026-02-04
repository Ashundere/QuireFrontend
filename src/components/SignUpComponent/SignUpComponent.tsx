import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const SignupForm = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
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
    setError(null);
    if (formData.username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${apiUrl}/users/register`, formData);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverMessage =
          err.response?.data?.message || "Server error occurred";
        setError(serverMessage);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-center gap-3 m-2"
    >
      {error && (
        <div className="alert alert-danger py-2 text-center" role="alert">
          {error}
        </div>
      )}
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="CoolUsername123"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          isInvalid={!!error && formData.username.length < 3}
        />
        <Form.Text className="text-muted">Create something unique!</Form.Text>
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
          required
          isInvalid={!!error && !formData.email.includes("@")}
        />
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
          required
          isInvalid={!!error && formData.password.length < 8}
        />
        <Form.Text className="text-muted">
          Password must be at least 8 characters long!
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Submit"}
      </Button>
    </Form>
  );
};

export default SignupForm;
