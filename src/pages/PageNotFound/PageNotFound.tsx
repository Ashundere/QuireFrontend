import { Card, Container } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Container
      className="vh-100 vw-100 d-flex justify-content-center align-items-center"
      fluid
    >
      <Card>404- Page Not Found</Card>
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
