import type { ReactNode } from "react";

import { AuthProvider } from "../../context/AuthContext";

    interface AppProvidersProps {
    children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {




  return (
        <AuthProvider>
          {children}
        </AuthProvider>
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