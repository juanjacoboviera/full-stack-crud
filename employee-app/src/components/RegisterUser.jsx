import React, {useState, useEffect} from 'react'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import createEmployee, {getEmployee, updateEmployee} from '../services/employeeServices';
import { useParams, useNavigate } from 'react-router-dom';
import registerImg from "../assets/scribble.svg"

const RegisterUser = () => {
    // const navigate = useNavigate();
    let { employeeId } = useParams();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const handleChange = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(formData)   
        createEmployee(formData)
        
        // navigate('/employees')
    }

useEffect(()=>{
    // setFormData({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     password: "",
    //     confirm_password: "",
    // })
    // if(employeeId){
    //     const getData = async () => {
    //         const employee = await getEmployee(employeeId)
    //         console.log(employee)
    //         setFormData(employee)        
    //     }
    //     getData()
    // }
},[])
    console.log(formData)
  return (
    <div className='layout flex justify-center'>
        <div className="container flex justify-center w-3/4 mt-5 mb-5 gap-5">
            <img src={registerImg} width="45%" alt="" />
            <form id='registerForm'  className='flex flex-col gap-5 items-center justify-center w-full p-10 border-solid border border-black' action="" onSubmit={handleSubmit}>
                <div className='flex flex-col w-2/3 gap-3'>
                    <div className="flex flex-col w-full gap-2 justify-center">
                        <label htmlFor="firstName">First name</label>
                        <InputText value={formData?.first_name} className='border-solid border-black border rounded' id="first_name" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('first_name', value)}  />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="lastName">Last Name</label>
                        <InputText  value={formData?.last_name} className='border-solid border-black border rounded' id="lastName" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('last_name', value)}  />
                    </div>
                </div>
                <div className='flex flex-col w-2/3 gap-3'>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email">E-mail</label>
                        <InputText  value={formData?.email} className='border-solid border-black border rounded' id="email" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('email', value)}  />
        
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="lastName">Password</label>
                        <Password  value={formData?.password} inputClassName='w-full' className='border-solid border-black border rounded' onChange={({ target: { value } }) => handleChange('password', value)} feedback={false} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="lastName">Confirm Password</label>
                        <Password  value={formData?.confirm_password} inputClassName='w-full' className='border-solid border-black border rounded' onChange={({ target: { value } }) => handleChange('confirm_password', value)} feedback={false} />
                    </div>
                </div>
                <div className='flex w-full justify-center'>
                    <Button  className="className='border-solid border-black border rounded px-5" label="Create Account" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterUser