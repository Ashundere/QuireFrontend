import { BrightnessHighFill, GearFill } from "react-bootstrap-icons";
import darkLogo from "../../assets/QuireLogoDark.png";
import lightLogo from "../../assets/QuireLogoLight.png";
import { useTheme } from "../../hooks/useTheme";
import { Image, Navbar, Form, Container, Nav } from "react-bootstrap";

import { Link, useNavigate } from "react-router";
const NavbarComponent = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Navbar fixed="top" className={`nav-bar-${theme} py-0 shadow-sm`}>
      <Container className="justify-content-start px-0 mx-0">
        <Image
          src={isDarkMode ? darkLogo : lightLogo}
          alt="Quire Logo which is a book with a quill writing in it, with the name Quire above it"
          onClick={() => navigate("/home")}
        />
        <Form>
          <Form.Check type="switch" id="theme-switch" onChange={toggleTheme} />
        </Form>
        <BrightnessHighFill />
      </Container>
      <Container className="justify-content-end gap-1">
        <GearFill/>
        <Link to="/user">Profile</Link>
      </Container>
    </Navbar>
  );
};
export default NavbarComponent;
