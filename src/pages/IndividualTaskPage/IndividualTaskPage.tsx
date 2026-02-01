import { useNavigate } from "react-router-dom"
import { useFetch } from '../../hooks/useFetch';
import type { TaskItemProps } from '../../types';
import { useParams } from 'react-router';
const apiUrl = import.meta.env.VITE_API_URL

export default function IndividualTaskPage(){
    const navigate = useNavigate()
    const { ID } = useParams<{ ID: string }>();
  const { data, loading, error } = useFetch<TaskItemProps>(
    `${apiUrl}/tasks/${ID}`
);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
  <div>
    <h1>{data?.title}</h1>
    <p>{data?.description}</p>
    <p>{data?.dueDate}</p>
    <button onClick={()=> navigate(`/tasks/edit/${ID}`)}>Edit Task</button>
    <button onClick={()=> navigate(-1)}>Return</button>
  </div>
  )

}
