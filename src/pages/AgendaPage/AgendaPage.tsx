import { useNavigate } from "react-router-dom"

export default function AgendaPage(){
    const navigate = useNavigate()
    
    return(
        <div className="page">
            <button onClick={()=> navigate("/")}>Return Home</button>
        </div>
    )
}