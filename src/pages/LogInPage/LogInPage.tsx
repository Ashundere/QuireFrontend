import { useNavigate } from "react-router-dom"
import LogInForm from "../../components/LogInComponent/LogInComponent"

export default function LogInPage(){
    const navigate = useNavigate()

    return(
        <div className="page">
            <h1> Log In </h1>
            <LogInForm/>
            <button onClick={()=> navigate("/")}>Return Home</button>
        </div>
    )
}