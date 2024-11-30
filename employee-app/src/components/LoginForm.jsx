import React, {useState, useEffect, useContext} from 'react'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { login } from '../services/auth';
import { useParams, useNavigate } from 'react-router-dom';
import registerImg from "../assets/scribble.svg"
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { GlobalStore } from '../GlobalProvider';

const LoginForm = () => {
    const {setToken} = useContext(GlobalStore)
    const navigate = useNavigate()
    let { employeeId } = useParams();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    }

    function setTokenInCookie(token) {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1); 
        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}`;
      }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(formData)   
        try {
            const response = await login(formData)
            const data = await response.json()
            if(data.token){
                setToken(data.token)
                setTokenInCookie(data.token)
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }

    
  return (
    <div className='layout flex justify-center'>
        <div className="container flex justify-center w-3/4 mt-5 mb-5 gap-5">
            <img src={registerImg} width="45%" alt="" />
            <form id='registerForm'  className='flex flex-col gap-5 items-center justify-center w-full p-10 border-solid border border-black' action="" onSubmit={handleSubmit}>
                <div className='flex flex-col w-2/3 gap-3'>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email">E-mail</label>
                        <InputText  value={formData?.email} className='border-solid border-black border rounded' id="email" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('email', value)}  />
        
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="lastName">Password</label>
                        <Password  value={formData?.password} inputClassName='w-full' className='border-solid border-black border rounded' onChange={({ target: { value } }) => handleChange('password', value)} feedback={false} />
                        <small>Not a user? <Link to="/register">Register here.</Link></small>
                    </div>
                </div>
                <div className='flex w-full justify-center'>
                    <Button  className="className='border-solid border-black border rounded px-5" label="Login" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginForm