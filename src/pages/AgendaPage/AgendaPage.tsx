import { useNavigate} from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { TasksResponse} from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Container } from "react-bootstrap";
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