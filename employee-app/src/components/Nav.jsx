import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { deleteCookie} from '../helpers/cookies'
import { GlobalStore } from '../GlobalProvider'

const Nav = () => {
  const {token, setToken, user, setUser} = useContext(GlobalStore)
  console.log(user)
  return (
    <div className='flex flex-row justify-between mx-10 my-5'>
        <div className="logo">
            <h1>Hello, {user.first_name}</h1>
        </div>
        {token && 
          <div className="nav-elements">
            <ul className='flex flex-row gap-10'>
            <Link to='/dashboard'><li>Dashboard</li></Link>
            <Link to='/createTask'><li>Create Task</li></Link>
            <Link to='/tasks'><li>Tasks</li></Link>
              {user.role.code == 'admin' ||  user.role.code == 'superAdmin' &&
              <Link to='/registerEmployee'><li>Create Employee</li></Link>
               }
              <Link to='/employees'><li>Employee List</li></Link>
              <Link to="/">
                <li>
                  <Button onClick={()=>{
                    deleteCookie("token")
                    setToken(null)
                    setUser({})
                  }} label="Log out"/>
                </li>
              </Link>
              </ul>
          </div>
        }
    </div>
  )
}

export default Nav