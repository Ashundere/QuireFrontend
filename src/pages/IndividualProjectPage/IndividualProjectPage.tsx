import { useNavigate, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import type { ProjectItemProps, TasksResponse } from "../../types";
import { useProject } from "../../hooks/useProject";
import { useDelete } from "../../hooks/useDelete";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  ArrowLeft,
  FilePlusFill,
  PencilSquare,
  Star,
  StarFill,
  TrashFill,
} from "react-bootstrap-icons";
const apiUrl = import.meta.env.VITE_API_URL;

export default function IndividualProjectPage() {
  const { setActiveProject, activeProjectId } = useProject();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { ID } = useParams<{ ID: string }>();
  const { execute: deleteProject } = useDelete();

  const deleteAndRoute = () => {
    try {
      deleteProject(`${apiUrl}/projects/${ID}`);
      navigate(-1);
    } catch (err) {
      return <p>Cannot Delete Project</p>;
    }
  };

  const {
    data: project,
    loading: projectLoading,
    error: projectError,
  } = useFetch<ProjectItemProps>(`${apiUrl}/projects/${ID}`);

  const {
    data: tasks,
    loading: tasksLoading,
    error: tasksError,
  } = useFetch<TasksResponse>(`${apiUrl}/projects/${ID}/tasks`);

  const toggleActive = () => {
    const currentId = project?._id ?? null;

    activeProjectId === currentId
      ? setActiveProject(null)
      : setActiveProject(currentId);
  };
  if (authLoading) return <p>Verifying session...</p>;
  if (projectLoading || tasksLoading) return <p>Loading...</p>;
  if (projectError || tasksError)
    return <p>Error: {projectError || tasksError}</p>;
  if (!project) return <p>Project not found.</p>;
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
      className="vw-100  gap-3 mt-5 pt-6"
      style={{ paddingTop: "200px" }}
      fluid
    >
      <Row className="d-flex justify-content-start m-0 gap-3">
        <Col className="d-flex flex-column justify-content-start p-3 gap-3 border-end">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="d-flex justify-content-between">
            <PencilSquare
              className="hover-button"
              onClick={() => navigate(`/projects/edit/${ID}`)}
            />
            <TrashFill className="hover-button" onClick={deleteAndRoute} />
          </div>
        </Col>
        <Col className=" d-flex flex-column justify-content-start text-align-center p-3">
          <h3>Tasks for this Project</h3>
          <div
            style={{
              height: "calc(100vh - 150px)",
              overflowY: "auto",
              paddingRight: "10px",
              overflowX: "hidden",
            }}
            className="d-flex flex-column align-items-center"
          >
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task) => (
                <Card
                  key={task._id}
                  style={{ width: "50rem", height: "9rem" }}
                  className="hover-card mb-3"
                  onClick={() => navigate(`/tasks/${task._id}`)}
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
          </div>
        </Col>
      </Row>
      <FilePlusFill
        onClick={() => navigate(`/tasks/new/${ID}`)}
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
      <div
        onClick={() => toggleActive()}
        className="hover-button fs-1"
        style={{
          position: "fixed",
          top: "120px",
          right: "40px",
          zIndex: 1000,
          cursor: "pointer",
        }}
      >
        {activeProjectId === project._id ? (
          <StarFill className="hover-button" />
        ) : (
          <Star className="hover-button" />
        )}
      </div>
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
    </Container>
  );
}
