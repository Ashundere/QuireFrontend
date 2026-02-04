import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

const NewTaskPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { ID } = useParams<{ ID: string }>();
  console.log(ID);
  const { execute: createTask, loading } = usePost();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "To Do",
    priority: "Low",
    project: ID,
    user: user?.id,
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  console.log("User ID:", user?.id);
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.title.trim() || formData.title.length < 3) {
      setValidationError("Please enter a title (min 3 characters).");
      return;
    }

    if (!formData.description.trim()) {
      setValidationError("Description cannot be empty.");
      return;
    }

    const selectedDate = new Date(formData.dueDate);
    const todayTimestamp = new Date().setHours(0, 0, 0, 0);

    if (
      isNaN(selectedDate.getTime()) ||
      selectedDate.getTime() < todayTimestamp
    ) {
      setValidationError("Please select a valid future date.");
      return;
    }

    try {
      await createTask(`${apiUrl}/projects/${ID}/tasks`, formData);
      navigate(-1);
    } catch (err) {
      setValidationError("Failed to save task. Please try again.");
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
            <h1> New Task </h1>
            {validationError && (
              <div className="alert alert-danger py-2 text-center" role="alert">
                {validationError}
              </div>
            )}
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
                  isInvalid={!!validationError && formData.title.length < 3}
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
                  isInvalid={!!validationError && formData.description.length < 10}
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
                  isInvalid={!!validationError && validationError == "Please select a valid future date."}
                />
              </Form.Group>
              <Form.Select
                aria-label="Status Select Menu"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
              <Form.Select
                aria-label="Priority Select Menu"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Select>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Adding Task..." : "Add Task"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewTaskPage;
