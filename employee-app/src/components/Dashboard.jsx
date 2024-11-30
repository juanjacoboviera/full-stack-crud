import React from 'react'
import { getCookie } from '../helpers/cookies'

const Dashboard = () => {
  getCookie('token')
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard