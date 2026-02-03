import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { usePut } from "../../hooks/usePut";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router";
import type { ProjectItemProps } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Container } from "react-bootstrap";


export default function EditProjectPage(){
  const navigate = useNavigate();
  const isAuthenticated = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL;
  const { execute: editProject} = usePut()
    const { ID } = useParams<{ ID: string }>();

  const { 
    data 
  } = useFetch<ProjectItemProps>(`${apiUrl}/projects/${ID}`);

  const [formData, setFormData] = useState({
    title: data?.title,
    description: data?.description,
    dueDate: data?.dueDate,
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
    setIsLoading(true);
    setError(null);

    try {
        const response = editProject(`${apiUrl}/projects/${ID}`, formData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverMessage =
          err.response?.data?.message || "Server error occurred";
        setError(serverMessage);
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Log In failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="vh-100 vw-100 d-flex justify-content-center align-items-center" fluid>
        <Card
          style={{ width: "18rem" }}
          className="text-center"
        >
          <Card.Body>
            <Card.Title>Please Log In</Card.Title>
            <Button variant="primary" onClick={() => navigate("/")}>
              Log In
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "300px",
      }}
    >
      <div>
        <label htmlFor="Title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder={formData.title}
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder={formData.description}
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          placeholder={formData.dueDate}
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Editing Project..." : "Edit Project"}
      </button>
    </form>
  );
};