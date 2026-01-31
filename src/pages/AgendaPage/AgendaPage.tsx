import { useNavigate} from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { TasksResponse} from "../../types";
const apiUrl = import.meta.env.VITE_API_URL

export default function AgendaPage(){

const navigate = useNavigate()
  const { data, loading, error } = useFetch<TasksResponse>(
    `${apiUrl}/tasks`
  );

  if (loading) return <p>Loading Tasks...</p>;
  if (error) return <p>Error: {error}</p>;

    console.log(data)
  return (
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
  );
}