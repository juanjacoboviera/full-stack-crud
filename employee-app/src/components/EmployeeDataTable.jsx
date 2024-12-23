import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  {getEmployees, deleteEmployee} from '../services/employeeServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../helpers/cookies';

const EmployeeDataTable = () => {
  const [employees, setEmployees] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const token = getCookie('token')

  useEffect(()=>{
    const getData = async (token) => {
        const employeeList = await getEmployees(token)
        setEmployees(employeeList) 
    }
    if(token){
      getData(token)
    }else{
      console.log('Token does not exist or already expired!')
    }
  },[userId])
  const editEmployee =  (id) => {
    navigate(`/${id}`);
  }

  const removeEmployee = async (id) => {
    deleteEmployee(id, token)
    setUserId(id, token)
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
        <DataTable value={employees} tableClassName='border-solid border-black border rounded text-center' tableStyle={{ minWidth: '50rem' }}>
            {columns.map((col, i) => (
                <Column 
                key={col.field} 
                field={col.field} header={col.header} 
                // body={col.field === 'job_dept.name' ? (rowData) => rowData.job_dept.name : undefined || col.field === actionsBodyTemplate ? (rowData)=> actionsBodyTemplate(rowData) : undefined}xw         
                />
            ))}
        </DataTable>
      </div>
    </div>
  )
}

export default EmployeeDataTable