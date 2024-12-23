import React, {useState, useEffect, useContext} from 'react'
import { GlobalStore } from '../GlobalProvider'
import { getTasks, updateTask } from '../services/taskServices'
import { TabView, TabPanel } from 'primereact/tabview';       
import TaskCard from '../ui/TaskCard'

const TaskList = () => {
  const {token, user} = useContext(GlobalStore)
  const [tasks, setTasks] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);

  const getData = async () => {
    try {
      if(activeIndex == 0){
        const taskList = await getTasks(user?._id, token, 'assigned')
        setTasks(taskList.tasks) 
      }else{
        const taskList = await getTasks(user?._id, token, 'created')
        setTasks(taskList.tasks)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(token){
      getData()
    }else{
      console.log('Token does not exist or already expired!')
    }
  },[activeIndex])

  const handleSubmit = async (taskUpdated) =>{
    const response = await updateTask(taskUpdated?._id, taskUpdated, token, user.role.code)
    console.log(response)
  }

  const renderTasks = () =>tasks.map(task => <TaskCard key={task._id} handleSubmit={handleSubmit} task={task}/>)

  return (
    <div className='layout flex flex-col justify-center items-center'>
      {user.role.code == 'user' ? 
      <>
        <h1>These are the list of tasks assigned to you</h1>
        {renderTasks()}
      </>
        :
      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Task assigned to me">
              {renderTasks()}
          </TabPanel>
          <TabPanel header="Task created by me">
              {renderTasks()}
          </TabPanel>
      </TabView>
      }
    </div>
  )
}

export default TaskList