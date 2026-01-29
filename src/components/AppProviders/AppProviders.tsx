import type { ReactNode } from "react";

    interface AppProvidersProps {
    children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {




  return (
    <>
    
    </>
  )
}

//Syntax:
//    <ToDoContext.Provider value={toDoValue}>
//       <FilterContext.Provider value={filterValue}>
//            <ThemeContext.Provider value={themeValue}>
//                {children}
 //           </ThemeContext.Provider>
//        </FilterContext.Provider>
//    </ToDoContext.Provider>