import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Container } from "react-bootstrap";

const NewTaskPage = () => {
  const navigate = useNavigate();
  const {user, isAuthenticated} = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL;
    const { ID } = useParams<{ ID: string }>();
    console.log(ID)
  const { execute: createTask, loading } = usePost();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "To Do",
    priority: "Low",
    project: ID,
    user: user?.id
  });

    console.log("User ID:", user?.id)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        console.log(formData)
      await createTask(`${apiUrl}/projects/${ID}/tasks`, formData);

      alert("Task added successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Task creation failed:", err);
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
    <div>
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
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding Task..." : "Add Task"}
        </button>
      </form>
      <button onClick={() => navigate(-1)}>Return</button>
    </div>
  );
};

export default NewTaskPage;
