import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";
import { auth } from "../Firebase";

function Register() {
  const [user,setUser] =useState({})
  const [error, setError] = useState("");

    const navigate = useNavigate()

    const handlechange =(e)=>{
        const{name,value} =e.target;
        setUser({
            ...user,
            [name]:value
        })
    }

    // email check regex
   // email check regex
  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleClick = async () => {
    // validation
    if (!user.name || !user.email || !user.pwd) {
      return setError(" All fields are required");
    }

    if (!isValidEmail(user.email)) {
      return setError(" Enter a valid email");
    }

    if (user.pwd.length < 6) {
      return setError(" Password must be at least 6 characters");
    }

    setError(""); // clear error

    // save to firebase
    try {
      let docRef = await addDoc(collection(db, "users"), user);
      alert("User Registered: " + docRef.id);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>

          <div className="mt-8">
            {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3 text-sm">
            {error}
          </p>
        )}


            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="name"
                    type="text"
                    required
                   
                    onChange={handlechange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    
                    onChange={handlechange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="pwd"
                    type="password"
                    required
                    onChange={handlechange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="Button"
                  onClick={handleClick}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                 Registar now
                </button>
              </div>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                    Sign in
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-green-400 to-green-600"></div>
      </div>
    </div>
  );
}

export default Register;