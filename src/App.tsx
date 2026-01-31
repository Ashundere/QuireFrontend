import "./App.css";
import { AppProviders } from "./components/AppProviders/AppProviders";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LogInPage from "./pages/LogInPage/LogInPage";
import IndividualProjectPage from "./pages/IndivdualProjectPage/IndividualProjectPage";
import NewProjectPage from "./pages/NewProjectPage/NewProjectPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AgendaPage from "./pages/AgendaPage/AgendaPage";
import ProjectManagerPage from "./pages/ProjectManagerPage/ProjectManagerPage";
import NewTaskPage from "./pages/NewTaskPage/NewTaskPage";
import IndividualTaskPage from "./pages/IndividualTaskPage/IndividualTaskPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Navbar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
    <AppProviders>
      <Navbar />
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/project/manager" element={<ProjectManagerPage/>} />
        <Route path="/project/:ID" element={<IndividualProjectPage />} />
        <Route path="/project/new" element={<NewProjectPage />} />
        <Route path="/tasks/manager" element={<AgendaPage />} />
        <Route path="/tasks/:ID" element={<IndividualTaskPage />} />
        <Route path="/tasks/new" element={<NewTaskPage />} />
        <Route path="/user" element={<AdminPage />} />
      </Routes>
    </AppProviders>
    </>
  );
}

//    <AppProviders>
export default App;
