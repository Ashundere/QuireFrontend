import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar";
import LiveClock from "../../components/Clock/Clock";
import PomodoroTimer from "../../components/TimerComponent/TimerComponent";
import { useTheme } from "../../hooks/useTheme";
import darkLogo from "../../assets/QuireLogoDark.png";
import lightLogo from "../../assets/QuireLogoLight.png";
import darkLinesRight from "../../assets/linedesigndark.png";
import lightLinesRight from "../../assets/linedesignlight.png";
import darkLinesLeft from "../../assets/linedesigndarkleft.png";
import lightLinesLeft from "../../assets/linedesignlightleft.png";
import { useFetch } from "../../hooks/useFetch";
import type { ProjectItemProps, TasksResponse } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { Card, Button, Container, Row, Col, Image} from "react-bootstrap";
import { HourglassSplit } from "react-bootstrap-icons";
const apiUrl = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("en-US", {
    dateStyle: "full",
  });
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const activeProjectId = localStorage.getItem("activeProjectId");
  const fetchUrl = activeProjectId
    ? `${apiUrl}/projects/${activeProjectId}`
    : null;
  const { data: project } = useFetch<ProjectItemProps>(fetchUrl);

  const { data: tasks } = useFetch<TasksResponse>(
    `${apiUrl}/projects/${activeProjectId}/tasks`,
  );

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

  return (
    <Container fluid>
      <Row className="m-auto pt-5">
          <Image
            className="hero-img"
            src={isDarkMode ? lightLogo : darkLogo}
            alt="Quire Logo which is a book with a quill writing in it, with the name Quire above it"
            fluid
          />
            <h2>{`Welcome, ${localStorage.getItem("username")}`}</h2>
            <h4>{currentDate}</h4>
            <LiveClock />
      </Row>
      <Row>
        <Col className="border-top border-bottom border-end p-3 text-center">
          <Sidebar />
        </Col>
        <Col xs lg="6" className="border-top border-bottom border-end p-3">
            <div className="d-flex justify-content-center">
              <Image
                className="display-list-img"
                src={isDarkMode ? lightLinesRight : darkLinesRight}
                alt="Decorative Lines"
              />
              <h1>Active Project</h1>
              <Image
                className="display-list-img"
                src={isDarkMode ? lightLinesLeft : darkLinesLeft}
                alt="Decorative Lines"
              />
            </div>
            <div className="text-center">
              <div>
                <h1>{project?.title}</h1>
                <p>{project?.description}</p>
                <p>{`Due: ${new Date(project!.dueDate).toLocaleDateString("en-US")}`}</p>
              </div>
              </div>
          <h3>Tasks for this Project</h3>
          <div
            style={{
              height: "calc(100vh - 150px)",
              overflowY: "auto",
              paddingRight: "10px",
              overflowX: "hidden",
            }}
            className="d-flex flex-column align-items-center"
          >
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task) => (
                <Card
                  key={task._id}
                  style={{ width: "50rem", height: "9rem" }}
                  className="hover-card mb-3"
                  onClick={()=>navigate(`/tasks/${task._id}`)}
                >
                  <Card.Title className="mt-2 mx-2 d-flex justify-content-between align-items-center">
                    <span>{task.title}</span>

                    <span className="text-muted fs-6">
                      {`Due: ${new Date(task.dueDate).toLocaleDateString("en-US")}`}
                    </span>
                  </Card.Title>
                  <Card.Body className="text-truncate">
                    <span>{task.description}</span>
                  </Card.Body>
                  <Card.Footer className="mt-2 mx-2 d-flex justify-content-between align-items-center">
                    <span className="text-muted fs-6">{task.status}</span>
                    <span className="text-muted fs-6">{task.priority}</span>
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </Col>
        <Col className="border-top border-bottom border-end p-3 text-center">
          <HourglassSplit/>
          <PomodoroTimer/>
        </Col>
      </Row>
    </Container>
  );
}
