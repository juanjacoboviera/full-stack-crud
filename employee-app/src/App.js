import './styles.css';
import RegisterEmployee from './components/RegisterEmployee';
import EmployeeDataTable from './components/EmployeeDataTable';
import RegisterUser from './components/RegisterUser';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './components/Nav';
function App() {
  return (
   <>
   <BrowserRouter>
      <Nav/>
      <Routes>
          <Route exact path="/register" element={ <RegisterUser/>}/>
          <Route exact path="/dashboard" element={ <Dashboard/>}/>
          <Route exact path="/" element={ <LoginForm/>}/>
          <Route exact path="/registerEmployee" element={ <RegisterEmployee/>}/>
          <Route exact path="/:employeeId" element={ <RegisterEmployee/>}/>
          <Route exact path="/employees" element={ <EmployeeDataTable/>} /> 
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
