import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";

const NewProjectForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
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
      console.log("Form Submitted:", formData);

      // POST request to your backend
      const response = usePost(`${apiUrl}/projects`, formData);
    } catch (err) {
      // TypeScript narrowing for Axios errors
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding Project..." : "Add Project"}
      </button>
    </form>
  );
};

export default NewProjectForm;
