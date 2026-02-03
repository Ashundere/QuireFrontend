import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/SignUpComponent/SignUpComponent";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

export default function SignUpPage() {
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
            className="justify-content-start"
          />
        </Col>
        <Col xs={11}>
          <Card className="d-flex justify-content-center align-items-center">
            <h1> Sign Up </h1>
            <SignupForm />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
