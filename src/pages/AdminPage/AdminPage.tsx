import { useNavigate } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";

export default function AdminPage(){
    const navigate = useNavigate()
    const { toggleTheme, theme } = useTheme()
    const { logout, isAuthenticated } = useAuth()

    if (!isAuthenticated) {
    return (
      <div className="login-prompt">
        <h1>Please Log In</h1>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    );
  }
    
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