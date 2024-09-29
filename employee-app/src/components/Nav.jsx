import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='flex flex-row justify-between mx-10 my-5'>
        <div className="logo">
            <h1>Logo</h1>
        </div>
        <div className="nav-elements">
            <ul className='flex flex-row gap-10'>
                <Link to='/'><li>Create Employee</li></Link>
                <Link to='/employees'><li>Employee List</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default Nav