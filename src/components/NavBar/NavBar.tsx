
import logo from "../../assets/Sonder-Logo-only.png"
const Navbar = () =>{
    




    return(
        <nav className="nav-bar">
            <img src={logo} alt="Sonder Logo which is a strand of dna in the middle of a circle"/>
            <a href="/">Home</a>
            <a href="/journal">Journal</a>
            <a href="/user">Profile</a>
        </nav>
    )
    //            <button onClick={toggleTheme}>{`${theme} Mode`}</button>
}

export default Navbar