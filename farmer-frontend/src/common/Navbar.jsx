import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import { User, Search, Menu, X, LogOut, Import } from "lucide-react"; 
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { flag } = React.useContext(LoginContext);
  
 

  return (
    <>
      <nav className="w-full shadow-md bg-white sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold">
            <p className="text-red-600">Farmer</p>
            <p className="text-orange-600">Portal</p>
            <GiFruitBowl className="text-green-500 text-3xl" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-green-600 hover:scale-110 font-bold text-lg">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 hover:scale-110 font-bold text-lg">About</Link>
            <Link to="/gallery" className="text-gray-700 hover:text-green-600 hover:scale-110 font-bold text-lg">Gallery</Link>
            <Link to="/gprojects" className="text-gray-700 hover:text-green-600 hover:scale-110 font-bold text-lg">G-projects</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 hover:scale-110 font-bold text-lg">Contact</Link>

            
            { flag === 1 && 
            <div className="">
              <NavLink to="/profile">
               <FaUserCircle size={28} className="text-gray-600" />
               </NavLink>
            </div>
       }
           {/*
            <div>
              <NavLink to="/cart">
                <FaShoppingCart size={24} className="text-gray-600" />
              </NavLink>
            </div> */}
             
              <div className="flex items-center gap-4">
                {flag === 0 ? (
            
              <NavLink to="/login" className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition">
                Login
              </NavLink>
            
               ) : (
    
              <NavLink to="/logout" className="bg-green-600 px-3 py-2 text-white hover:bg-green-700 transition flex items-center gap-2">
            
            
                Logout
              </NavLink>
            
               )}               
               
              </div>
           
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
            <Link to="/" className="block text-gray-700 font-normal" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block text-gray-700 font-semibold" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/gallery" className="block text-gray-700 font-semibold" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
            <Link to="/gprojects" className="block text-gray-700 font-semibold" onClick={() => setIsMenuOpen(false)} >G-projects</Link> 
            <Link to="/contact" className="block text-gray-700 font-semibold" onClick={() => setIsMenuOpen(false)}>Contact</Link>

            { flag === 1 && 
            <div className="">
              <NavLink to="/profile">
               Profile
               </NavLink>
            </div>
          } 

          {flag === 0 ? (
                <Link 
                  to="/login" 
                  className="block w-full bg-green-500 text-white py-2 text-center hover:bg-green-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
          ):(
             <Link 
                  to="/logout" 
                  className="block w-full bg-green-500 text-white py-2 text-center hover:bg-green-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Logout
                </Link>
          )}
                
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;