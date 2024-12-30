import React, {useState, useEffect, useContext} from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';
import createEmployee, {getEmployees, updateEmployee} from '../services/employeeServices';
import { useParams, useNavigate } from 'react-router-dom';
import { getCookie } from '../helpers/cookies';
import { GlobalStore } from '../GlobalProvider';
import { createTask } from '../services/taskServices';

const CreateTask = () => {
    const {user} = useContext(GlobalStore)
    const [employeeOptions, setEmployeeOptions] = useState([])
    const {token} = useContext(GlobalStore)
    const navigate = useNavigate();
    let { employeeId } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        task_completed: false,
        tasked_user: "",
        task_creator: {name: `${user?.first_name } ${user?.last_name}`, id: user?._id},
    });

    const handleChange = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    }
   
    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(formData)
        try {
            await createTask(formData, token)
        } catch (error) {
            console.log({error: error})
        }
    }
    
    const organizeEmployeeData = (rawEmployeeData) =>{
        return  rawEmployeeData?.map(employee =>{
            return {name: `${employee?.first_name } ${employee?.last_name }`, id: employee?._id}  
      })
    }

useEffect(()=>{
        const getData = async () => {
            const rawEmployeesData = await getEmployees(token)
            console.log(rawEmployeesData)
            const employeesList = organizeEmployeeData(rawEmployeesData.data.items)
            setEmployeeOptions(employeesList)        
        }
        getData()
},[])

  return (
    <div className='layout flex justify-center'>
        <div className="container flex justify-center w-3/4 mt-10">
            <form id='registerForm'  className='flex flex-column gap-5 flex-wrap justify-center w-full p-10 border-solid border border-black' action="" onSubmit={handleSubmit}>
                <div className='flex-column items-center w-1/2 gap-3'>
                    <div className="flex flex-col w-full gap-2 justify-center mb-4">
                        <label htmlFor="firstName">Task Name</label>
                        <InputText value={formData?.title} className='border-solid border-black border rounded' id="first_name" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('title', value)}  />
                    </div>
                    <div className="flex flex-col w-full gap-2 mb-4">
                        <label htmlFor="lastName">Task Description</label>
                        <InputTextarea  value={formData?.description} className='border-solid border-black border rounded' id="lastName" aria-describedby="username-help" onChange={({ target: { value } }) => handleChange('description', value)}  />
                    </div>
                    <div className="flex flex-col gap-2 w-full mb-4">
                        <label htmlFor="role">Assign Task to</label>
                        <Dropdown className="className='border-solid border-black border rounded" panelClassName='border-solid border-black border rounded bg-white' value={formData?.tasked_user}  onChange={({ target: { value } }) => handleChange('tasked_user', value)}  options={employeeOptions} optionLabel="name" 
                        placeholder="Select Employee"/>
                    </div>
                </div>
                <div className='flex w-full justify-center'>
                    <Button  className="className='border-solid border-black border rounded px-5" label="Create Task" />
                </div>
            </form>
        </div>
    </div>
  )
}
export default CreateTask