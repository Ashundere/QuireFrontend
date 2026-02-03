import { Button, Card, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();


  return (
    <Container
      className="vh-100 vw-100 d-flex justify-content-center align-items-center"
      fluid
    >
      <Card style={{ width: "22rem" }} className="text-center">
        <Card.Body>
          <Card.Title className="fs-1">Welcome to Quire</Card.Title>
          <Stack className="gap-1">
            <Button variant="primary" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button variant="primary" onClick={() => navigate("/sign-up")}>
              Sign Up
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}
