import type { ReactNode } from "react";

import { AuthProvider } from "../../context/AuthContext";
import { ThemeProvider } from "../../context/ThemeContext";
import { ProjectProvider } from "../../context/ActiveProjectContext";

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

