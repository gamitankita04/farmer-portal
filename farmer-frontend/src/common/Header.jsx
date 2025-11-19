import { useState } from "react";
import { User, Search } from "lucide-react"; // icons

const FarmerNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-green-800 text-white w-full shadow-md z-50">
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">Farmer Portal</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-green-300 transition">Home</a>
          <a href="#" className="hover:text-green-300 transition">Services</a>
          <a href="#" className="hover:text-green-300 transition">About</a>

          {/* Dropdown Select */}
          <select className="bg-green-700  px-3 py-2 rounded-xl focus:outline-none">
            <option value="">Select Crop</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="cotton">Cotton</option>
          </select>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-3 py-1 rounded-xl text-gray-700 focus:outline-none"
            />
            <Search
              size={18}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Auth */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <User size={22} className="text-white" />
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="bg-green-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-green-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700 px-4 pb-4 space-y-3">
          <a href="#" className="block hover:text-green-300">Home</a>
          <a href="#" className="block hover:text-green-300">Services</a>
          <a href="#" className="block hover:text-green-300">About</a>

          <select className="w-full bg-white text-green-800 px-3 py-2 rounded-md focus:outline-none">
            <option value="">Select Crop</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="cotton">Cotton</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 rounded-md text-black focus:outline-none"
            />
            <Search
              size={18}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <User size={22} className="text-white" />
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full bg-green-600 px-3 py-2 rounded-md hover:bg-green-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-white text-green-800 px-3 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default FarmerNavbar;
