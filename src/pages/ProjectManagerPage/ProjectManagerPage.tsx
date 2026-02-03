import { useNavigate} from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { ProjectsResponse} from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Container } from "react-bootstrap";
const apiUrl = import.meta.env.VITE_API_URL

export default function ProjectManagerPage(){

const navigate = useNavigate();
const isAuthenticated = useAuth();
  const { data, loading, error } = useFetch<ProjectsResponse>(
    `${apiUrl}/projects`
  );


  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p>Error: {error}</p>;

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
        data.map((project) => (
          <li key={project._id} style={{ margin: '10px 0' }}>
            <a href={`/projects/${project._id}`}>
              <span>{project.title}</span>
            </a>
          </li>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </ul>
    <button onClick={()=> navigate("/projects/new")}>+</button>
    <button onClick={()=> navigate(-1)}>Return</button>
    </div>
  );
}