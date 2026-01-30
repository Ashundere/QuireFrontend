import { useNavigate } from "react-router-dom"
import SignupForm from "../../components/SignUpComponent/SignUpComponent"

export default function SignUpPage(){
    const navigate = useNavigate()

    return(
        <div className="page">
            <h1> Sign Up </h1>
            <SignupForm/>
            <button onClick={()=> navigate("/")}>Return Home</button>
        </div>
    )
}