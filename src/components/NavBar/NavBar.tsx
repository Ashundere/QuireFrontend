
import darkLogo from "../../assets/QuireLogoDark.png"
import lightLogo from "../../assets/QuireLogoLight.png"
import { useTheme } from "../../hooks/useTheme"

const Navbar = () =>{
    const { isDarkMode, toggleTheme, theme } = useTheme();




    return(
        <nav className={`nav-bar-${theme}`}>
            <img src={isDarkMode ? darkLogo : lightLogo}  alt="Quire Logo which is a book with a quill writing in it, with the name Quire above it"/>
            <a href="/home">Home</a>
            <a href="/project/manager">Projects</a>
            <a href="/user">Profile</a>
            <button onClick={toggleTheme}>{`${theme} Mode`}</button>
        </nav>
    )
}

export default Navbar