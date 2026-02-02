import { useNavigate} from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { TasksResponse} from "../../types";
import { useAuth } from "../../hooks/useAuth";
const apiUrl = import.meta.env.VITE_API_URL

export default function AgendaPage(){

const navigate = useNavigate()
const isAuthenticated = useAuth()
  const { data, loading, error } = useFetch<TasksResponse>(
    `${apiUrl}/tasks`
  );

  if (loading) return <p>Loading Tasks...</p>;
  if (error) return <p>Error: You must be logged in to do that!</p>;
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
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((task) => (
          <li key={task._id} style={{ margin: '10px 0' }}>
            <a href={`/tasks/${task._id}`}>
              <span>{task.title}</span>
            </a>
          </li>
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </ul>
    <button onClick={() => navigate(-1)}>Return</button>
    </div>
  );
}