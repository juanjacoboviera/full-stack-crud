import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  {getEmployees} from '../services/employeeServices';

const EmployeeDataTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(()=>{
    const getData = async () => {
        const employeeList = await getEmployees()
        setEmployees(employeeList)
     
    }
    getData()
},[])
 
    const columns = [
        {field: 'first_name', header: 'First name'},
        {field: 'last_name', header: 'Last Name'},
        {field: 'email', header: 'E-mail'},
        {field: 'job_dept.name', header: 'Department'}
    ];

  return (
    <div className="card">
    <DataTable value={employees} tableStyle={{ minWidth: '50rem' }}>
        {columns.map((col, i) => (
            <Column key={col.field} field={col.field} header={col.header} body={col.field === 'job_dept.name' ? (rowData) => rowData.job_dept.name : undefined} />
        ))}
    </DataTable>
</div>
  )
}

export default EmployeeDataTable