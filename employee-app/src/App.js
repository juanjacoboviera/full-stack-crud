import './styles.css';
import RegisterEmployee from './components/RegisterEmployee';
import EmployeeDataTable from './components/EmployeeDataTable';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './components/Nav';
function App() {
  return (
   <>
   <BrowserRouter>
      <Nav/>
      <Routes>
          <Route exact path="/" element={ <RegisterEmployee/>}/>
          <Route exact path="/employees" element={ <EmployeeDataTable/>} /> 
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
