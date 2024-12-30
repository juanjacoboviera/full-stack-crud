import React, {useState, useEffect, useContext} from 'react'
import { GlobalStore } from '../GlobalProvider'
import { getTasks, updateTask } from '../services/taskServices'
import { TabView, TabPanel } from 'primereact/tabview';    
import { Paginator } from 'primereact/paginator';   
import TaskCard from '../ui/TaskCard'

const TaskList = () => {
  const {token, user} = useContext(GlobalStore)
  const [tasks, setTasks] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);
  const [first, setFirst] = useState(0);
  const [paginationSettings, setPaginationSettings] = useState({
    first: 0,
    limit: 0,
    total: 0
  });

  const getData = async () => {
    try {
      if(activeIndex == 0){
        console.log("entrando")
        const taskList = await getTasks(user?._id, token, 'assigned', 3, first)
        setTasks(taskList?.data?.items)
        setPaginationSettings({
          ...paginationSettings,
          limit: taskList?.data?.limit,
          total: taskList?.data?.total
        }) 
      }else{
        const taskList = await getTasks(user?._id, token, 'created', 3,  first)
        setTasks(taskList?.data?.items)
        setPaginationSettings({
          ...paginationSettings,
          limit: taskList?.data?.limit,
          total: taskList?.data?.total
        }) 

      }
    } catch (error) {
      console.log(error)
    }
  }
console.log(tasks)
  useEffect(()=>{
    if(token){
      getData()
    }else{
      console.log('Token does not exist or already expired!')
    }
  },[activeIndex, first])

  const handleSubmit = async (taskUpdated) =>{
    const response = await updateTask(taskUpdated?._id, taskUpdated, token, user.role.code)
    console.log(response)
  }

  const renderTasks = () =>tasks?.map(task => <TaskCard key={task?._id} handleSubmit={handleSubmit} task={task} userRole={user.role.code} activeIndex={activeIndex}/>)

  const onPageChange = (event) => {
    console.log(event)
    setFirst(event.first);
    // setPaginationSettings({...paginationSettings, first: event.first});

};

  return (
    <div className='layout flex flex-col justify-center items-center'>
      {user.role.code == 'user' ? 
      <>
        <h1>These are the list of tasks assigned to you</h1>
        {renderTasks()}
      </>
        :
      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className='tabView-styles w-full'>
          <TabPanel header="Task assigned to me" headerClassName={`tab-header-title-light ${activeIndex === 0 ? "tab-header-selected" : ""}`}>
              {renderTasks()}
          </TabPanel>
          <TabPanel header="Task created by me"  headerClassName={`tab-header-title-light ${activeIndex === 1 ? "tab-header-selected" : ""}`}>
              {renderTasks()}
          </TabPanel>
      </TabView>
      }
       <div className="card">
            <Paginator first={first} rows={paginationSettings?.limit} totalRecords={paginationSettings?.total} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
        </div>
    </div>
  )
}

export default TaskList