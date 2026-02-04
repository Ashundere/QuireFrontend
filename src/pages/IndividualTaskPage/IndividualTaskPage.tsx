import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { TaskItemProps } from "../../types";
import { useParams } from "react-router";
import { useDelete } from "../../hooks/useDelete";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeft, PencilSquare, TrashFill } from "react-bootstrap-icons";
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
      <Row className="m-0 gap-3">
        <Col className=" p-3 gap-3 border-end">
          <Card className="justify-content-center text-align-center">
            <Card.Header className="mt-2 mx-2 d-flex justify-content-between align-items-center text-truncate">
              <span>{data?.title}</span>
              <span className="text-muted fs-6">
                {`Due: ${new Date(data!.dueDate).toLocaleDateString("en-US")}`}
              </span>
            </Card.Header>
            <Card.Title className="mt-2 mx-2 d-flex justify-content-between align-items-center">
              <span>{data?.description}</span>
            </Card.Title>
            <Card.Body className="mt-2 mx-2 d-flex justify-content-between align-items-center">
              <span>{`Status: ${data?.status}`}</span>
              <span className="text-muted fs-6">
                {`Priority: ${data?.priority}`}
              </span>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <PencilSquare
                className="hover-button"
                onClick={() => navigate(`/tasks/edit/${ID}`)}
              />
              <TrashFill className="hover-button" onClick={deleteAndRoute} />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
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
