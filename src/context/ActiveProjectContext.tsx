import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import type { ProjectContextType } from '../types';



export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}


export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

useEffect(() => {
    if (activeProjectId) {
    localStorage.setItem('activeProjectId', activeProjectId);
  }
  }, [activeProjectId]);
  const setActiveProject = (_id: string | null) => {
    setActiveProjectId(_id);
  };

  return (
    <ProjectContext.Provider value={{ activeProjectId, setActiveProject }}>
      {children}
    </ProjectContext.Provider>
  );
};