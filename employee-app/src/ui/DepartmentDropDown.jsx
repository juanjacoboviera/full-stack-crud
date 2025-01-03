import React, {useState} from 'react'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const DepartmentDropDown = ({colField, rowData, onSubmit, actionsBodyTemplate, setActiveIndex, activeIndex, setDepartment, department}) => {
    // const [department, setDepartment] = useState({});
    const jobDeptOptions = [
        { name: 'Marketing', code: '1' },
        { name: 'Sales', code: '2' },
        { name: 'Logistics', code: '3' },
        { name: 'HHRR', code: '4' },
        { name: 'Billing', code: '5' }
    ];
        
    const renderField = () =>{
      if (colField === 'job_dept.name' && activeIndex == rowData._id ){
        return <Dropdown className="className='border-solid border-black border rounded dataTable-input" panelClassName='border-solid border-black border rounded bg-white' value={department}  onChange={({ target: { value } }) =>{
          onSubmit(rowData._id, value)

        }}  options={jobDeptOptions} optionLabel="name"  placeholder='Select a department' />
      }
      if (colField === 'job_dept.name') {
        // console.log(rowData.job_dept?.name, 'did it work?')
        return rowData.job_dept?.name || <Button id={rowData._id} onClick={() => setActiveIndex(rowData._id)}    className='assignDept-btn' label='Click to assign' icon={<FontAwesomeIcon className='cursor-pointer mr-1' icon={faPencil} />}/>;
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