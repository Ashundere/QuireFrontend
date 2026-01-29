import { useNavigate } from "react-router-dom"

export default function NewProjectPage(){
    const navigate = useNavigate()
    
    return(
        <div className="page">
            <button onClick={()=> navigate("/")}>Return Home</button>
        </div>
    )
}