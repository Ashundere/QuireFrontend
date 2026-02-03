import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Container, Form, Nav, Stack } from "react-bootstrap";
import { ArrowLeft, BrightnessHighFill } from "react-bootstrap-icons";

export default function AdminPage() {
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const { logout, isAuthenticated } = useAuth();

  const notYou = () => {
    logout();
    navigate("/");
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
      <Card style={{ width: "22rem" }} className="text-center">
        <Card.Body>
          <Card.Title className="fs-1">{`Welcome, ${localStorage.getItem("username")}`}</Card.Title>
          <Stack className="gap-1">
            <Button variant="primary" onClick={() => notYou()}>
              Not You?
            </Button>
            <Button variant="primary" onClick={logout}>
              Log Out
            </Button>
            <div>
              <Form>
                <Form.Check
                  type="switch"
                  id="theme-switch"
                  onChange={toggleTheme}
                />
              </Form>
              <BrightnessHighFill />
            </div>
          </Stack>
        </Card.Body>
      </Card>
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
