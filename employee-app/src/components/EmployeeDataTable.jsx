import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  {getEmployees, getEmployee} from '../services/employeeServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


const EmployeeDataTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(()=>{
    const getData = async () => {
        const employeeList = await getEmployees()
        setEmployees(employeeList)
     
    }
    getData()
  },[])
  
  const editEmployee = async () => {
    const selectedEmployee = await getEmployee("66f5974c6712e228b3586af8")
    console.log(selectedEmployee)
  }

    const actionsBodyTemplate = () =>{
      return(
        <div className='flex flex-row justify-center gap-2'>
          <FontAwesomeIcon className='cursor-pointer' onClick={editEmployee} icon={faEdit} />
          <FontAwesomeIcon className='cursor-pointer' icon={faTrash} />
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
      <div className="container flex justify-center w-3/4 mt-10">
        <DataTable value={employees} tableClassName='border-solid border-black border rounded text-center' tableStyle={{ minWidth: '50rem' }}>
            {columns.map((col, i) => (
                <Column key={col.field} field={col.field} header={col.header} body={col.field === 'job_dept.name' ? (rowData) => rowData.job_dept.name : undefined} />
            ))}
        </DataTable>
      </div>
    </div>
  )
}

export default EmployeeDataTable