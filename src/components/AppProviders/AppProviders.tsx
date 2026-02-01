import type { ReactNode } from "react";

import { AuthProvider } from "../../context/AuthContext";
import { ThemeProvider } from "../../context/ThemeContext";
import { ProjectContext, ProjectProvider } from "../../context/ActiveProjectContext";

    interface AppProvidersProps {
    children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {




  return (
      <ThemeProvider>
        <AuthProvider>
          <ProjectProvider>
          {children}
          </ProjectProvider>
        </AuthProvider>
      </ThemeProvider>
  );
};

//Syntax:
//    <ToDoContext.Provider value={toDoValue}>
//       <FilterContext.Provider value={filterValue}>
//            <ThemeContext.Provider value={themeValue}>
//                {children}
 //           </ThemeContext.Provider>
//        </FilterContext.Provider>
//    </ToDoContext.Provider>