import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { TaskItemProps } from "../../types";
import { useParams } from "react-router";
import { useDelete } from "../../hooks/useDelete";
import { useAuth } from "../../hooks/useAuth";
const apiUrl = import.meta.env.VITE_API_URL;

export default function IndividualTaskPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const { ID } = useParams<{ ID: string }>();
  const { execute: deleteTask } = useDelete();
  const deleteAndRoute = () => {
    try {
      deleteTask(`${apiUrl}/tasks/${ID}`);
      navigate(-1);
    } catch (err) {
      return <p>Cannot Delete Task</p>;
    }
  };
  const { data, loading, error } = useFetch<TaskItemProps>(
    `${apiUrl}/tasks/${ID}`,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!isAuthenticated) {
    return (
      <div className="login-prompt">
        <h1>Please Log In</h1>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    );
  }
  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <p>{data?.dueDate}</p>
      <button onClick={() => navigate(`/tasks/edit/${ID}`)}>Edit Task</button>
      <button onClick={deleteAndRoute}>Delete</button>
      <button onClick={() => navigate(-1)}>Return</button>
    </div>
  );
}
