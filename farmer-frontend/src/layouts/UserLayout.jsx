import React from 'react'

import FarmerNavbar from '../common/Header'
import { Outlet } from 'react-router-dom'
import { FaSeedling, FaSearch, FaUser } from 'react-icons/fa'
import FarmerFooter from '../common/Footer'
import Navbar from '../common/Navbar'

function UserLayout() {
  return (
    <div>
       {/* Header */}
       <Navbar/>
      {/*<FarmerNavbar/> */}
      {/* Main content */}
      <main>
        <Outlet/>
      </main>
      
      <FarmerFooter/>
    </div>
  )
}

export default UserLayout
