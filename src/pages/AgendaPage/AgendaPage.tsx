import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { TasksResponse } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeft} from "react-bootstrap-icons";
import { useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export default function AgendaPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const { execute, data, loading, error } = useFetch<TasksResponse>();

  useEffect(() => {
    if (isAuthenticated) {
      execute(`${apiUrl}/tasks`);
    }
  }, [isAuthenticated, apiUrl]);
  if (loading) return <p>Loading Tasks...</p>;
  if (error) return <p>Error: You must be logged in to do that!</p>;
  if (!isAuthenticated) {
    return (
      <Container
        className="vh-100 vw-100 d-flex justify-content-center align-items-center"
        fluid
      >
        <Card style={{ width: "18rem" }} className="text-center">
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
    <Container
      className=" vw-100 d-flex flex-column justify-content-center align-items-center gap-3 mt-5 pt-5"
      fluid
    >
      <Row className="m-0 gap-3">
        <Col xs={1} className=" justify-content-start p-3 gap-3">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="justify-content-start hover-button"
            style={{
              position: "fixed",
              top: "120px",
              left: "40px",
              fontSize: "2.5rem",
              zIndex: 1000,
              cursor: "pointer",
            }}
          />
        </Col>
        <Col xs={11} className=" justify-content-start p-3">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((task) => (
              <Card
                key={task._id}
                style={{ width: "50rem", height: "9rem" }}
                className="hover-card mb-3"
                onClick={()=>navigate(`/tasks/${task._id}`)}
              >
                <Card.Title className="mt-2 mx-2 d-flex justify-content-between align-items-center">
                  <span>{task.title}</span>

                  <span className="text-muted fs-6">
                    {`Due: ${new Date(task.dueDate).toLocaleDateString("en-US")}`}
                  </span>
                </Card.Title>
                <Card.Body className="text-truncate">
                  <span>{task.description}</span>
                </Card.Body>
                <Card.Footer className="mt-2 mx-2 d-flex justify-content-between align-items-center">
                  <span className="text-muted fs-6">{task.status}</span>
                  <span className="text-muted fs-6">{task.priority}</span>
                </Card.Footer>
              </Card>
            ))
          ) : (
            <p>No tasks found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
