import { useNavigate } from "react-router-dom"
import logo from "../../assets/Sonder-Logo-transparent.png"
export default function HomePage(){
    const navigate= useNavigate()
    return(
        <div className="page">
            <img src={logo} alt="Sonder Logo which is a strand of dna in the middle of a circle"/>
            <button onClick={()=> navigate("/login")}>Log In</button>
        </div>
    )
}