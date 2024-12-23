import React, {useState} from 'react'
import { InputSwitch } from 'primereact/inputswitch';  
const TaskCard = ({task, handleSubmit, userRole, activeIndex}) => {
    const [taskCompleted, setTaskCompleted] = useState(task?.task_completed)
    const dateString = task.createdAt
    const dateObj = new Date(dateString);
    
    const handleChange = (e) =>{
      setTaskCompleted((prevState) => {
        const newState = !prevState
        const taskUpdated = {...task, task_completed: newState}
        handleSubmit(taskUpdated)
        return newState
      })
    }
   
  return (
    <div className='flex flex-col gap-5 flex-wrap w-1/2 p-10 border-solid border border-black mb-4'>
        <div className='flex flex-row justify-between'>
            {userRole == "user" || activeIndex == 0 ?
              <p>Assigned by: {task.task_creator.name}</p>
              :
              <p>Assigned to: {task.tasked_user.name}</p>
            }
              <p>{dateObj.toLocaleDateString('en-US').toString()}</p>
        </div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        {taskCompleted ? 
        <p>Task status: Complete</p> 
        :
        <form className='flex flex-col'>
          <label className='mb-2' htmlFor="">Mark as complete?</label>
          <InputSwitch checked={taskCompleted}  onChange={handleChange}/>
        </form>
        }
    </div>
  )
}

export default TaskCard