import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { usePut } from "../../hooks/usePut";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router";
import type { TaskItemProps } from "../../types";


export default function EditTaskPage(){
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { execute: editProject} = usePut()
    const { ID } = useParams<{ ID: string }>();

  const { 
    data 
  } = useFetch<TaskItemProps>(`${apiUrl}/tasks/${ID}`);

  const [formData, setFormData] = useState({
    title: data?.title,
    description: data?.description,
    dueDate: data?.dueDate,
    status: data?.status,
    priority: data?.priority
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      console.log("Form Submitted:", formData);

      const response = editProject(`${apiUrl}/tasks/${ID}`, formData);
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Editing Task..." : "Edit Task"}
        </button>
      </form>
  );
};