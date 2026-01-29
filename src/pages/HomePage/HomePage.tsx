import { useNavigate } from "react-router-dom"
import logo from "../../assets/QuireLogoTransparent.png"
export default function HomePage(){
    const navigate= useNavigate()
    return(
        <div className="page">
            <img src={logo} alt="Quire Logo which is a book on top of an inkwll, with the name Quire above it"/>
            <button onClick={()=> navigate("/login")}>Log In</button>
        </div>
    )
}