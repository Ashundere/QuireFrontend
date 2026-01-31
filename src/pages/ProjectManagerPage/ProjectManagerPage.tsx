import { useNavigate} from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { ProjectsResponse} from "../../types";
const apiUrl = import.meta.env.VITE_API_URL

export default function ProjectManagerPage(){

const navigate = useNavigate()
  const { data, loading, error } = useFetch<ProjectsResponse>(
    `${apiUrl}/projects`
  );

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p>Error: {error}</p>;

    console.log(data)
  return (
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
  );
}