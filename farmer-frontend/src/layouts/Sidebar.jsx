import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiMail, 
  FiPackage, 
  FiVideo, 
  FiAward, 
  FiBarChart2, 
  FiSettings,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

import { GiFruitBowl } from "react-icons/gi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/admin/',
      badge: null
    },
    {
      name: 'Farmers Management',
      icon: <FiUsers className="w-5 h-5" />,
      path: '/admin/farmers',
      badge: null
    },
    {
      name: 'Communications',
      icon: <FiMail className="w-5 h-5" />,
      path: '/admin/communications',
      badge: '2'
    },
    {
      name: 'Medicines & Crops',
      icon: <FiPackage className="w-5 h-5" />,
      path: '/admin/medicines',
      badge: null
    },
    {
      name: 'Video Library',
      icon: <FiVideo className="w-5 h-5" />,
      path: '/admin/videos',
      badge: '5'
    },
    {
      name: 'Government Projects',
      icon: <FiAward className="w-5 h-5" />,
      path: '/admin/government-projects',
      badge: 'New'
    },
    {
      name: 'Reports & Analytics',
      icon: <FiBarChart2 className="w-5 h-5" />,
      path: '/admin/reports',
      badge: null
    },
    {
      name: 'System Settings',
      icon: <FiSettings className="w-5 h-5" />,
      path: '/admin/settings',
      badge: null
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`bg-green-800 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between border-b border-green-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
               <GiFruitBowl className="text-white text-3xl" />
            </div>
            <h2 className="text-xl font-bold">Farmers Admin</h2>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto">
            <span className="text-green-800 font-bold text-sm">FM</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-green-200 hover:text-white p-1 rounded"
        >
          {isCollapsed ? <FiChevronRight className="w-4 h-4" /> : <FiChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'text-blue-200 hover:bg-green-700 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

     
    </div>
  );
};

export default Sidebar;