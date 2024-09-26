import React, {useState, useEffect} from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import createEmployee, {getEmployees} from '../services/employeeServices';

const RegisterEmployee = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        job_dept: "",

    });
    const jobDeptOptions = [
        { name: 'Marketing', code: '1' },
        { name: 'Sales', code: '2' },
        { name: 'Logistics', code: '3' },
        { name: 'HHRR', code: '4' },
        { name: 'Billing', code: '5' }
    ];

    const handleChange = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        createEmployee(formData)
        console.log(formData)
    }

useEffect(()=>{
    const getData = async () => {
        const result = await getEmployees()
        console.log(result)
    }
    getData()
},[formData])

  return (
    <div className='layout flex justify-center'>
        <div className="container w-1/2">
            <form id='registerForm'  className='flex flex-row gap-5 flex-wrap justify-center mt-10' action="" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstName">First name</label>
                    <InputText value={formData.first_name} className='border-solid border-black border rounded' id="first_name" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('first_name', value)}  />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">Last Name</label>
                    <InputText  value={formData.last_name} className='border-solid border-black border rounded' id="lastName" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('last_name', value)}  />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">E-mail</label>
                    <InputText  value={formData.email} className='border-solid border-black border rounded' id="email" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('email', value)}  />
       
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">Job title</label>
                    <Dropdown className="className='border-solid border-black border rounded" value={formData.job_dept}  onChange={({ target: { value } }) => handleChange('job_dept', value)}  options={jobDeptOptions} optionLabel="name" 
                    placeholder="Select Department"/>
                </div>
                <Button  className="className='border-solid border-black border rounded px-5" label="Submit" />
            </form>
        </div>
    </div>
  )
}

export default RegisterEmployee