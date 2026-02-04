import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePut } from "../../hooks/usePut";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router";
import type { ProjectItemProps } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

export default function EditProjectPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { execute: editProject } = usePut();
  const { ID } = useParams<{ ID: string }>();

  const { execute, data } = useFetch<ProjectItemProps>();

  useEffect(() => {
    if (isAuthenticated) {
      execute(`${apiUrl}/projects/${ID}`);
    }
  }, [isAuthenticated, apiUrl]);

  const [formData, setFormData] = useState({
    title: data?.title,
    description: data?.description,
    dueDate: data?.dueDate,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      editProject(`${apiUrl}/projects/${ID}`, formData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverMessage =
          err.response?.data?.message || "Server error occurred";
        setError(serverMessage);
        return <div>{error && <p className="text-danger">{error}</p>}</div>;
      } else {
        setError("An unexpected error occurred");
        return <div>{error && <p className="text-danger">{error}</p>}</div>;
      }
    } finally {
      setIsLoading(false);
      navigate(-1)
    }
  };

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
      className="vh-100 vw-100 d-flex justify-content-center align-items-center"
      fluid
    >
      <Row className="m-0">
        <Col xs={1} className=" justify-content-start p-3">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="justify-content-start"
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
        <Col xs={11}>
          <Card className="d-flex justify-content-center align-items-center">
            <h1> Editing Project </h1>
            <Form
              onSubmit={handleSubmit}
              className="d-flex flex-column justify-content-center gap-3 m-2"
            >
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit Title"
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  type="text"
                  placeholder="Edit Description"
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDueDate">
                <Form.Label>Due Date:</Form.Label>
                <Form.Control
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Editing Project..." : "Edit Project"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
