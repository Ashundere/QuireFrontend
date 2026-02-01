import { useNavigate } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";

export default function AdminPage(){
    const navigate = useNavigate()
    const { toggleTheme, theme } = useTheme()
    const { logout } = useAuth()
    
    return(
        <div className="page">
            <h1>{`Welcome, ${localStorage.getItem("username")}`}</h1>
            <p>Not you?</p>
            <button onClick={logout}>Log Out</button>
            <button onClick={()=> navigate(-1)}>Return Home</button>
            <button onClick={toggleTheme}>{`${theme} Mode`}</button>
        </div>
    )
}