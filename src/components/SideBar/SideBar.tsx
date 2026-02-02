import { Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const Sidebar = () =>{
const navigate = useNavigate()
    



    return(
        <nav>
            <Stack className="mx-auto">
                <button className="btn-primary w-100">Today</button>
                <button className="btn-primary" onClick={()=>navigate("/projects/manager")}>Projects</button>
                <button className="btn-primary" onClick={()=>navigate("/tasks/manager")}>Tasks</button>
                <button className="btn-primary">Overdue</button>
                <button className="btn-primary" onClick={()=>navigate("/user")}>Profile</button>
            </Stack>
        </nav>
    )
}

// in sidebar:
//Search Bar (Will open page to task/project searched)
//Today (Filters to show only Tasks/Projects Due Today)
//Projects (routes to projects/manager)
//Tasks (routes to tasks/manager)
//Overdue (Filters to show only tasks/projects that are overdue)
export default Sidebar