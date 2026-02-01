import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";

const NewProjectPage = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { execute: createProject, loading} = usePost();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      await createProject(`${apiUrl}/projects`, formData);
      
      alert("Project added successfully!");
      navigate("/home"); 
    } catch (err) {
      console.error("Project creation failed:", err);
    }
  };

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
      <button type="submit" disabled={loading}>
        {loading ? "Adding Project..." : "Add Project"}
      </button>
    </form>
    <button onClick={()=> navigate(-1)}>Return</button>
    </div>
  );
};

export default NewProjectPage;