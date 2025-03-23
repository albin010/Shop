import React from 'react'

import Sidebar from './components/sidebar/Sidebar'
import AdminNavbar from './components/navbar/AdminNavbar'
import AdminRouter from '../router/AdminRouter'

const Admin = () => {
  return (
    <div>
      <AdminNavbar/>
      <Sidebar/>
      <AdminRouter/>
    </div>
  )
}

export default Admin
