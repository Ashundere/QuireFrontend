import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar";
import LiveClock from "../../components/Clock/Clock";
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
      <div className="login-prompt">
        <h1>Please Log In</h1>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-header">
        <div className="hero-left">
          <img
            src={isDarkMode ? lightLogo : darkLogo}
            alt="Quire Logo which is a book with a quill writing in it, with the name Quire above it"
          />
          <div className="hero-info">
              <h2>{`Welcome, ${localStorage.getItem("username")}`}</h2>
            <h4>{currentDate}</h4>
            <LiveClock />
          </div>
          <div className="hero-right"></div>
        </div>
      </div>
      <div className="main-content">
        <Sidebar />
        <div className="display-list">
          <div className="display-list-header">
            <img
              src={isDarkMode ? lightLinesRight : darkLinesRight}
              alt="Decorative Lines"
            />
            <h1>Active Project</h1>
            <img
              src={isDarkMode ? lightLinesLeft : darkLinesLeft}
              alt="Decorative Lines"
            />
          </div>
          <div className="display-list-footer">
            <div>
              <h1>{project?.title}</h1>
              <p>{project?.description}</p>
              <p>{project?.dueDate}</p>
              <p>{project?.user}</p>
            </div>
            <h3>Tasks for this Project</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {Array.isArray(tasks) && tasks.length > 0 ? (
                tasks.map((task) => (
                  <li key={task._id} style={{ margin: "10px 0" }}>
                    <a href={`/tasks/${task._id}`}>
                      <span>{task.title}</span>
                    </a>
                  </li>
                ))
              ) : (
                <p>No tasks found.</p>
              )}
            </ul>
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
