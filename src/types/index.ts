// 1. Define the structure of your JWT payload
export interface DecodedToken {
  id: string;
  email: string;
  exp: number; // Expiration time (unix timestamp)
  iat?: number;
}

// 2. Define the Context interface
export interface AuthContextType {
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  token: string | null;
}

export interface ProjectContextType {
  activeProjectId: string | null;
  setActiveProject: (id: string | null) => void;
}

export type Theme = 'light' | 'dark';
export type Status = 'To do' | 'In Progress' | 'Completed';
export type Priority = "Low" | "Medium" | "High"

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface FormData {
  username?: string;
  email: string;
  password: string;
}

export interface TaskItemProps {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status
  project: ProjectItemProps
}

export interface ProjectItemProps {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  user: string;
}

export interface TasksResponse {
  tasks: TaskItemProps[]
}
export interface ProjectsResponse {
  projects: ProjectItemProps[]
}