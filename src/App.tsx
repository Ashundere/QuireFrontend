import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { AppProviders } from "./components/AppProviders/AppProviders";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LogInPage from "./pages/LogInPage/LogInPage";
import IndividualProjectPage from "./pages/IndividualProjectPage/IndividualProjectPage";
import NewProjectPage from "./pages/NewProjectPage/NewProjectPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AgendaPage from "./pages/AgendaPage/AgendaPage";
import ProjectManagerPage from "./pages/ProjectManagerPage/ProjectManagerPage";
import NewTaskPage from "./pages/NewTaskPage/NewTaskPage";
import IndividualTaskPage from "./pages/IndividualTaskPage/IndividualTaskPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";
import EditProjectPage from "./pages/EditProjectPage/EditProjectPage";
import NavbarComponent from './components/NavBar/NavBar';

function App() {
  return (
    <>
    <AppProviders>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/projects/manager" element={<ProjectManagerPage/>} />
        <Route path="/projects/:ID" element={<IndividualProjectPage />} />
        <Route path="/projects/new" element={<NewProjectPage />} />
        <Route path="/tasks/manager" element={<AgendaPage />} />
        <Route path="/tasks/:ID" element={<IndividualTaskPage />} />
        <Route path="/tasks/new/:ID" element={<NewTaskPage />} />
        <Route path="/user" element={<AdminPage />} />
        <Route path="/tasks/edit/:ID" element={<EditTaskPage/>} />
        <Route path="/projects/edit/:ID" element={<EditProjectPage/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AppProviders>
    </>
  );
}


export default App;
