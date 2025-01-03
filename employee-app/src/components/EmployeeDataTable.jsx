import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  {getEmployees, deleteEmployee, updateEmployee} from '../services/employeeServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../helpers/cookies';
import { GlobalStore } from '../GlobalProvider';
import DepartmentDropDown from '../ui/DepartmentDropDown';

const EmployeeDataTable = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {user} = useContext(GlobalStore)
  const [totalRecords, setTotalRecords] = useState(null);
  const [department, setDepartment] = useState({});
  const [employees, setEmployees] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const token = getCookie('token')
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 2,
    page: 1,
});

  useEffect(()=>{
    const getData = async (token) => {
        const employeeList = await getEmployees(token, 2, lazyState.first)
        setEmployees(employeeList?.data.items)
        setTotalRecords(employeeList?.data?.total)
    }
    if(token){
      getData(token)
    }else{
      console.log('Token does not exist or already expired!')
    }
  },[userId, lazyState, department])
  
  const editEmployee =  (id) => {
    if(user.role.code == 'user'){return}
    navigate(`/${id}`);
  }
console.log(department)
  const onPage = (event) => {
    setlazyState(event);
};

  const removeEmployee = async (id) => {
    deleteEmployee(id, token)
    setUserId(id, token)
  }

  const onSubmit = async (employeeId, inputValue) => {
    setDepartment(inputValue)
    const formData = {
      job_dept: inputValue
    }
  const result = await updateEmployee(employeeId, formData, token)
  console.log(result)

}

const actionsBodyTemplate = (rowData) =>{
  const {_id} = rowData
  return(
    <div className='flex flex-row justify-center gap-5'>
      <FontAwesomeIcon className='cursor-pointer'  onClick={()=> editEmployee(_id)} icon={faEdit} />
      <FontAwesomeIcon className='cursor-pointer' onClick={()=> removeEmployee(_id)} icon={faTrash} />
    </div>
  )    
}
    const columns = [
      {field: 'first_name', header: 'First name'},
      {field: 'last_name', header: 'Last Name'},
      {field: 'email', header: 'E-mail'},
      {field: 'job_dept.name', header: 'Department'},
      {field: actionsBodyTemplate, header: 'Actions'}
  ];

  return (
    <div className="layout flex justify-center">
      <div className="container flex justify-center mt-10">
        <DataTable value={employees} tableClassName='border-solid border-black border rounded text-center' paginator lazy first={lazyState.first} rows={2} totalRecords={totalRecords} onPage={onPage} paginatorTemplate={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} tableStyle={{ minWidth: '50rem' }}>
            {columns.map((col, i) => (
                <Column 
                key={col.field} 
                header={col.header} 
                field={col.field} 
                // body={col.field === 'job_dept.name' ? (rowData) => rowData.job_dept.name : undefined || col.field === actionsBodyTemplate ? (rowData)=> actionsBodyTemplate(rowData) : undefined}
                body={(rowData) => <DepartmentDropDown colField={col.field} rowData={rowData} onSubmit={onSubmit} actionsBodyTemplate={actionsBodyTemplate} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setDepartment={setDepartment} department={department}/>}
                />
            ))}
        </DataTable>
      </div>
    </div>
  )
}

export default EmployeeDataTable