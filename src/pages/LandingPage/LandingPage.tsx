import { useNavigate } from "react-router-dom"
import SignupForm from "../../components/SignUpComponent/SignUpComponent"

export default function LandingPage(){
    const navigate = useNavigate()

    return(
        <div className="page">
            <h1> Welcome to Quire </h1>
            <button onClick={()=> navigate("/login")}>Log In</button>
            <button onClick={()=> navigate("/sign-up")}>Sign Up</button>
        </div>
    )
}