import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { deleteCookie} from '../helpers/cookies'
import { GlobalStore } from '../GlobalProvider'

const Nav = () => {
  const {token, setToken} = useContext(GlobalStore)
  return (
    <div className='flex flex-row justify-between mx-10 my-5'>
        <div className="logo">
            <h1>Logo</h1>
        </div>
        {token && 
          <div className="nav-elements">
            <ul className='flex flex-row gap-10'>
              <Link to='/registerEmployee'><li>Create Employee</li></Link>
              <Link to='/employees'><li>Employee List</li></Link>
              <Link to="/">
                <li>
                  <Button onClick={()=>{
                    deleteCookie("token")
                    setToken(null)
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