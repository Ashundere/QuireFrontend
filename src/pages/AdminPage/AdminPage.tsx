import { useNavigate } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Container } from "react-bootstrap";

export default function AdminPage(){
    const navigate = useNavigate()
    const { toggleTheme, theme } = useTheme()
    const { logout, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <Container className="vh-100 vw-100 d-flex justify-content-center align-items-center" fluid>
        <Card
          style={{ width: "18rem" }}
          className="text-center"
        >
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
    
    return(
        <div className="page">
            <h1>{`Welcome, ${localStorage.getItem("username")}`}</h1>
            <p>Not you?</p>
            <button onClick={logout}>Log Out</button>
            <button onClick={()=> navigate(-1)}>Return Home</button>
            <button onClick={toggleTheme}>{`Current Theme: ${theme}`}</button>
        </div>
    )
}