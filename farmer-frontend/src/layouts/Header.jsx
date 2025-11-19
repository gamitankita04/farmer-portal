import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Farmer Management System</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
           <div>
            <NavLink to="/admin/profile">
            <FaUserCircle size={28} className="text-gray-600" />
            </NavLink>
           </div>
          
           <div className="relative">
             <NavLink to="/logout" className="bg-red-600 px-3 py-2 text-white hover:bg-green-700 transition flex items-center gap-2">
              Logout
             </NavLink>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;