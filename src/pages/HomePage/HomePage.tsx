import { useNavigate } from "react-router-dom";
import logo from "../../assets/QuireLogoLight.png";
import Sidebar from "../../components/SideBar/SideBar";
import LiveClock from "../../components/Clock/Clock";
import { useTheme } from "../../hooks/useTheme";
import darkLogo from "../../assets/QuireLogoDark.png";
import lightLogo from "../../assets/QuireLogoLight.png";
import darkLinesRight from "../../assets/linedesigndark.png";
import lightLinesRight from "../../assets/linedesignlight.png";
import darkLinesLeft from "../../assets/linedesigndarkleft.png";
import lightLinesLeft from "../../assets/linedesignlightleft.png";

export default function HomePage() {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("en-US", {
    dateStyle: "full",
  });
  const { isDarkMode } = useTheme();

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
          <div className="hero-right">
          </div>
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
            <h1>Agenda</h1>
                        <img
              src={isDarkMode ? lightLinesLeft : darkLinesLeft}
              alt="Decorative Lines"
            />
        </div>
        <div className="display-list-footer">
                <button>+</button>
        </div>
        </div>
      </div>
    </div>
  );
}
