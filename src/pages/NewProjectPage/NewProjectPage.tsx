import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

const NewProjectPage = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const isAuthenticated = useAuth();
  const { execute: createProject, loading } = usePost();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createProject(`${apiUrl}/projects`, formData);
      navigate(-1);
    } catch (err) {
      console.error("Project creation failed:", err);
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
            <h1> New Project </h1>
            <Form
              onSubmit={handleSubmit}
              className="d-flex flex-column justify-content-center gap-3 m-2"
            >
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="My Super Awesome Title"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  type="text"
                  placeholder="My Super Awesome Description"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDueDate">
                <Form.Label>Due Date:</Form.Label>
                <Form.Control
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Adding Project..." : "Add Project"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProjectPage;
