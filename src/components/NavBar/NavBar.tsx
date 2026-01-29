
import logo from "../../assets/QuireLogoTransparent.png"
const Navbar = () =>{
    




    return(
        <nav className="nav-bar">
            <img src={logo} alt="Quire Logo which is a book on top of an inkwll, with the name Quire above it"/>
            <a href="/">Home</a>
            <a href="/journal">Journal</a>
            <a href="/user">Profile</a>
        </nav>
    )
    //            <button onClick={toggleTheme}>{`${theme} Mode`}</button>
}

export default Navbar