import { Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const Sidebar = () =>{
const navigate = useNavigate()
    



    return(
        <nav>
            <Stack className="mx-auto">

                <button className="btn-primary" onClick={()=>navigate("/projects/manager")}>Projects</button>
                <button className="btn-primary" onClick={()=>navigate("/tasks/manager")}>Tasks</button>
                <button className="btn-primary" onClick={()=>navigate("/user")}>Profile</button>
            </Stack>
        </nav>
    )
}

export default Sidebar