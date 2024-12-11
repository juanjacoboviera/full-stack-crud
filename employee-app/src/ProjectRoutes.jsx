import { useContext } from 'react';
import RegisterEmployee from './components/RegisterEmployee';
import EmployeeDataTable from './components/EmployeeDataTable';
import RegisterUser from './components/RegisterUser';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import CreateTask from './components/CreateTask';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Nav from './components/Nav';
import { GlobalStore } from './GlobalProvider';
function ProjectRoutes() {
  const {token} = useContext(GlobalStore)
  return (
   <>
   <BrowserRouter>
      <Nav/>
      <Routes>
          <Route exact path="/register" element={ <RegisterUser/>}/>
          <Route exact path="/" element={ <LoginForm/>}/>
          {token != null ?  
          <>
            <Route exact path="/dashboard" element={ <Dashboard/>}/>
            <Route exact path="/registerEmployee" element={ <RegisterEmployee/>}/>
            <Route exact path="/:employeeId" element={ <RegisterEmployee/>}/>
            <Route exact path="/employees" element={ <EmployeeDataTable/>} /> 
            <Route exact path="/createTask" element={ <CreateTask/>} /> 
          </>
          :
          <Route path="*" element={<Navigate to="/" />} />
          }
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default ProjectRoutes;
