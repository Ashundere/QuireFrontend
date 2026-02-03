import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { ProjectsResponse } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeft, FilePlusFill, PlusLg } from "react-bootstrap-icons";
const apiUrl = import.meta.env.VITE_API_URL;

export default function ProjectManagerPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const { data, loading, error } = useFetch<ProjectsResponse>(
    `${apiUrl}/projects`,
  );

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p>Error: {error}</p>;

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
      className="vw-100 d-flex flex-column justify-content-center align-items-center gap-3 mt-5 pt-5"
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
            data.map((project) => (
              <Card
                key={project._id}
                style={{ width: "50rem", height: "6rem" }}
                className="hover-card mb-3"
              >
                <Card.Title className="mt-2 mx-2 d-flex justify-content-between align-items-center">
                  <span>{project.title}</span>

                  <span className="text-muted fs-6">
                    {`Due: ${new Date(project.dueDate).toLocaleDateString("en-US")}`}
                  </span>
                </Card.Title>
                <Card.Body className="text-truncate">
                  {project.description}
                </Card.Body>
                <a
                  href={`/projects/${project._id}`}
                  className="stretched-link"
                ></a>
              </Card>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </Col>
      </Row>
      <FilePlusFill
        onClick={() => navigate("/projects/new")}
        className="justify-content-end fs-1 hover-button"
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          fontSize: "3rem", 
          zIndex: 1000, 
          cursor: "pointer",
        }}
      />
    </Container>
  );
}
