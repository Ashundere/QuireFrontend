import { useNavigate } from "react-router-dom";
import LogInForm from "../../components/LogInComponent/LogInComponent";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

export default function LogInPage() {
  const navigate = useNavigate();

  return (
    <Container
      className="vh-100 vw-100 d-flex justify-content-center align-items-center"
      fluid
    >
      <Row className="m-0">
        <Col xs={1} className=" justify-content-start p-3">
          <ArrowLeft
            onClick={() => navigate("/")}
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
        <Col xs={11}>
          <Card className="d-flex justify-content-center align-items-center">
            <h1> Log In </h1>
            <LogInForm />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
