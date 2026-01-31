const Sidebar = () =>{

    



    return(
        <nav className={`side-bar`}>
            <ul>
                <button>Today</button>
                <a href="/project/manager">Projects</a>
                <a href="/tasks/manager">Tasks</a>
                <button>Overdue</button>
            </ul>
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