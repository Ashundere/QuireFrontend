import { useNavigate} from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { ProjectsResponse} from "../../types";
import { useAuth } from "../../hooks/useAuth";
const apiUrl = import.meta.env.VITE_API_URL

export default function ProjectManagerPage(){

const navigate = useNavigate();
const isAuthenticated = useAuth();
  const { data, loading, error } = useFetch<ProjectsResponse>(
    `${apiUrl}/projects`
  );


  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!isAuthenticated) {
    return (
      <div className="login-prompt">
        <h1>Please Log In</h1>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    );
  }
  return (
    <div>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((project) => (
          <li key={project._id} style={{ margin: '10px 0' }}>
            <a href={`/projects/${project._id}`}>
              <span>{project.title}</span>
            </a>
          </li>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </ul>
    <button onClick={()=> navigate("/projects/new")}>+</button>
    <button onClick={()=> navigate(-1)}>Return</button>
    </div>
  );
}