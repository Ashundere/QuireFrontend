// import { useNavigate } from "react-router-dom"
// import { useFetch } from '../../hooks/useFetch';
// import type { ProjectItemProps} from '../../types';
// import { useParams } from 'react-router';
// import { useProject } from "../../hooks/useProject";

// const apiUrl = import.meta.env.VITE_API_URL

// export default function IndividualProjectPage(){
//     const { setActiveProject } = useProject();
//     const navigate = useNavigate()
//     const { ID } = useParams<{ ID: string }>();
//   const { data, loading, error } = useFetch<ProjectItemProps>(
//     `${apiUrl}/projects/${ID}`
// );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//   <div>
//     <h1>{data?.title}</h1>
//     <p>{data?.description}</p>
//     <p>{data?.dueDate}</p>
//     <p>{data?.user}</p>
//     <button onClick={()=> setActiveProject(data!._id)}>Make Active Project</button>
//     <button onClick={()=> navigate(`/tasks/new/${ID}`)}>+</button>
//     <button onClick={()=> navigate("/")}>Return Home</button>
//   </div>
//   )

// }
import { useNavigate, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import type { ProjectItemProps, TasksResponse } from "../../types";
import { useProject } from "../../hooks/useProject";
import { useDelete } from "../../hooks/useDelete";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Container } from "react-bootstrap";
const apiUrl = import.meta.env.VITE_API_URL;

export default function IndividualProjectPage() {
  const { setActiveProject } = useProject();
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const { ID } = useParams<{ ID: string }>();
  const { execute: deleteProject } = useDelete();

  const deleteAndRoute = () => {
    try {
      deleteProject(`${apiUrl}/projects/${ID}`);
      navigate(-1);
    } catch (err) {
      return <p>Cannot Delete Project</p>;
    }
  };
  const {
    data: project,
    loading: projectLoading,
    error: projectError,
  } = useFetch<ProjectItemProps>(`${apiUrl}/projects/${ID}`);

  const {
    data: tasks,
    loading: tasksLoading,
    error: tasksError,
  } = useFetch<TasksResponse>(`${apiUrl}/projects/${ID}/tasks`);

  if (projectLoading || tasksLoading) return <p>Loading...</p>;
  if (projectError || tasksError)
    return <p>Error: {projectError || tasksError}</p>;
  if (!project) return <p>Project not found.</p>;
  if (!isAuthenticated) {
    return (
      <Container className="vh-100 vw-100 d-flex justify-content-center align-items-center" fluid>
        <Card
          style={{ width: "18rem" }}
          className="text-center"
        >
          <Card.Body>
            <Card.Title>Please Log In</Card.Title>
            <Button variant="primary" onClick={() => navigate("/")}>
              Log In
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <h3>Tasks for this Project</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} style={{ margin: "10px 0" }}>
              <a href={`/tasks/${task._id}`}>
                <span>{task.title}</span>
              </a>
            </li>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </ul>

      <button onClick={() => setActiveProject(project._id)}>
        Make Active Project
      </button>
      <button onClick={() => navigate(`/projects/edit/${ID}`)}>
        Edit Project
      </button>
      <button onClick={() => navigate(`/tasks/new/${ID}`)}>+</button>
      <button onClick={deleteAndRoute}>Delete</button>
      <button onClick={() => navigate(-1)}>Return</button>
    </div>
  );
}
