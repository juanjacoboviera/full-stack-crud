import React, {useState, useEffect, useContext} from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import createEmployee, {getEmployee, updateEmployee} from '../services/employeeServices';
import { useParams, useNavigate } from 'react-router-dom';
import { getCookie } from '../helpers/cookies';
import { GlobalStore } from '../GlobalProvider';

const RegisterEmployee = () => {
    const {token} = useContext(GlobalStore)
    const navigate = useNavigate();
    let { employeeId } = useParams();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        job_dept: "",
        password: "",
        confirm_password: "",
        role: {name: "", code: ""},
    });

    const roleOptions = [
        { name: 'User', code: 'user' },
        { name: 'Admin', code: 'admin' },
    ];

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

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            if(employeeId){
                await updateEmployee(employeeId, formData, token)
            }else{
                await createEmployee(formData, token)
            }
            navigate('/employees')
        } catch (error) {
            console.log({error: error})
        }
    }

useEffect(()=>{
    setFormData({
        first_name: "",
        last_name: "",
        email: "",
        job_dept: "",
    })
    if(employeeId){
        const getData = async () => {
            const employee = await getEmployee(employeeId, token)
            setFormData(employee)        
        }
        getData()
    }
},[employeeId])

  return (
    <div className='layout flex justify-center'>
        <div className="container flex justify-center w-3/4 mt-10">
            <form id='registerForm'  className='flex flex-row gap-5 flex-wrap justify-center w-full p-10 border-solid border border-black' action="" onSubmit={handleSubmit}>
                <div className='flex w-2/3 gap-3'>
                    <div className="flex flex-col w-1/2 gap-2 justify-center">
                        <label htmlFor="firstName">First name</label>
                        <InputText value={formData?.first_name} className='border-solid border-black border rounded' id="first_name" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('first_name', value)}  />
                    </div>
                    <div className="flex flex-col w-1/2 gap-2">
                        <label htmlFor="lastName">Last Name</label>
                        <InputText  value={formData?.last_name} className='border-solid border-black border rounded' id="lastName" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('last_name', value)}  />
                    </div>
                </div>
                <div className='flex w-2/3 gap-3'>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="email">E-mail</label>
                        <InputText  value={formData?.email} className='border-solid border-black border rounded' id="email" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('email', value)}  />
        
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="role">Role</label>
                        <Dropdown className="className='border-solid border-black border rounded" panelClassName='border-solid border-black border rounded bg-white' value={formData?.role}  onChange={({ target: { value } }) => handleChange('role', value)}  options={roleOptions} optionLabel="name" 
                        placeholder="Select Role"/>
                    </div>
                </div>
                <div className='flex w-2/3 gap-3'>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="lastName">Password</label>
                        <Password  value={formData?.password} inputClassName='w-full' className='border-solid border-black border rounded' onChange={({ target: { value } }) => handleChange('password', value)} feedback={false} />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="lastName">Confirm Password</label>
                        <Password  value={formData?.confirm_password} inputClassName='w-full' className='border-solid border-black border rounded' onChange={({ target: { value } }) => handleChange('confirm_password', value)} feedback={false} />
                    </div>
                </div>
                <div className='flex w-full justify-center'>
                    <Button  className="className='border-solid border-black border rounded px-5" label="Submit" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterEmployee