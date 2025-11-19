import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import UserLayout from './layouts/UserLayout'    
import CropDetails from './corp/Wheat'
import About from './farmer/About'
import Contact from './farmer/Contact'
import Hero from './farmer/Hero'
import Home from './farmer/Home'
import Gallery from './farmer/Gallery'
import Profile from './farmer/Profile'
import Login from './farmer/Login'
import Register from './farmer/Register'
import Dashboard from './Admin/Dashboard'
import AdminLayouts from './layouts/AdminLayouts'
import Farmermanagement from './Admin/Farmermanagement'
import Communications from './Admin/Communications'
import Farmers from './Admin/Farmermanagement'
import Pp from './pp'
import Medicines from './Admin/Medcines'
import VideoLibrary from './Admin/VideoLibrary'
import { AuthProvider } from './context/AuthContext'
import { LoginContext } from './context/LoginContext'
import { useEffect } from 'react'
import Cart from './cart/Cart'
import ProtectedRoute from './context/ProtectedRoute'
import Logout from './context/Logout'
import AdminProfile from './Admin/AdminProfile'
import GovernmentProjects from './Admin/GovernmentProjects'
import GovtFarmerSchemes from './farmer/GovtProjects'

function App() {
 const [flag, setFlag] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("firebaseTOKEN");
    if (token) setFlag(1);
  }, []);

  return (
    <>
   <LoginContext.Provider value={{ flag, setFlag }}>
     
    <Routes>
      <Route path="/" element={<UserLayout/>} >
        <Route index element={<Home/>} />
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="whete" element={<CropDetails/>}/>
        <Route path="gallery"  element={<Gallery/>}/>
        <Route path="profile"  element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="login"  element={<Login/>}/>
        <Route path="cart"  element={<Cart/>}/> 
        <Route path="gprojects" element={<GovtFarmerSchemes/>} />
        <Route path="register"  element={<Register/>}/>
        <Route path="logout"  element={<Logout/>}/>
        <Route path="pp" element={<Pp/>} />
      </Route>

      <Route path='/admin' element={
        <AdminLayouts>
            <AdminLayouts/>
        </AdminLayouts> 
        } >
        
           <Route index element={<Dashboard/>} />
           <Route path='farmers' element={<Farmers/>} />
           <Route path='communications' element={<Communications/>} />
           <Route path='medicines' element={<Medicines/>} />
           <Route path='videos' element={<VideoLibrary/>} />
           <Route path='profile' element={<AdminProfile/>} />
           <Route path='government-projects' element={<GovernmentProjects/>} />
           <Route path='reports' element={<h1>Reports & Analytics</h1>} />
           <Route path='settings' element={<h1>Settings</h1>} />
      </Route>
    </Routes>

    </LoginContext.Provider>

    </>
  )
}

export default App
