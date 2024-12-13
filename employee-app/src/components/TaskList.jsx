import React, {useState, useEffect, useContext} from 'react'
import { GlobalStore } from '../GlobalProvider'
import { getTasks } from '../services/taskServices'

const TaskList = () => {
  const {token, user} = useContext(GlobalStore)
  const [tasks, setTasks] = useState([])
  console.log(user)
  useEffect(()=>{
    const getData = async () => {
      try {
        console.log(user?._id)
        const taskList = await getTasks(user?._id, token)
        setTasks(taskList) 
      } catch (error) {
        console.log(error)
      }
    }
    if(token){
      getData()
    }else{
      console.log('Token does not exist or already expired!')
    }
  },[])

  return (
    <div className='layout flex flex-col justify-center align-center'>
        <h1>These are the list of tasks assigned to you</h1>
        <div className='flex flex-column gap-5 flex-wrap w-1/2 p-10 border-solid border border-black'>
            <div className='flex flex-row justify-between'>
                <p>Assigned by: Juan Jacobo Viera</p>
                <p>01/22/2024</p>
            </div>
            <h2>Task Title</h2>
            <p>This is the description of the task</p>
        </div>
    </div>
  )
}

export default TaskList