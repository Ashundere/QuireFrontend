import { useNavigate } from "react-router-dom"
import { useFetch } from '../../hooks/useFetch';
import type { ProjectItemProps} from '../../types';
import { useParams } from 'react-router';
const apiUrl = import.meta.env.VITE_API_URL

export default function IndividualProjectPage(){
    const navigate = useNavigate()
    const { ID } = useParams<{ ID: string }>();
  const { data, loading, error } = useFetch<ProjectItemProps>(
    `${apiUrl}/projects/${ID}`
);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
  <div>
    <h1>{data?.title}</h1>
    <p>{data?.description}</p>
    <p>{data?.dueDate}</p>
    <p>{data?.user}</p>
    <button onClick={()=> navigate("/")}>Return Home</button>
  </div>
  )

}