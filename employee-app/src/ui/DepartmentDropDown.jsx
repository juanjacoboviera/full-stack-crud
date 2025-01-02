import React, {useState} from 'react'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'

const DepartmentDropDown = ({colField, rowData, handleChange, editEmployee, removeEmployee, actionsBodyTemplate}) => {
    const [readyToAssign, setReadyToAssign] = useState(false)
    const [department, setDepartment] = useState({});
console.log(colField, rowData)
    const jobDeptOptions = [
        { name: 'Marketing', code: '1' },
        { name: 'Sales', code: '2' },
        { name: 'Logistics', code: '3' },
        { name: 'HHRR', code: '4' },
        { name: 'Billing', code: '5' }
    ];
        
    const renderField = () =>{
        if (colField === 'job_dept.name' && readyToAssign ){
            return <Dropdown className="className='border-solid border-black border rounded" panelClassName='border-solid border-black border rounded bg-white' value={department}  onChange={({ target: { value } }) => setDepartment(value)}  options={jobDeptOptions} optionLabel="name"  placeholder='Select a department' />
          }
          if (colField === 'job_dept.name') {
            return rowData.job_dept?.name || <Button id={rowData._id} onClick={() => setReadyToAssign(true)}    className='assignDept-btn' label='Click to assign' icon={<FontAwesomeIcon className='cursor-pointer mr-1' icon={faPencil} />}/>;
          }
          if (colField === actionsBodyTemplate){
            return actionsBodyTemplate(rowData)
          }
          return rowData[colField];
    }
  return (
    renderField()
  )
}

export default DepartmentDropDown