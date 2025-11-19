// AdminProtectedRoute.jsx
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'

function AdminRoute({ children }) {
  const { flag } = useContext(LoginContext)
  const userData = JSON.parse(localStorage.getItem('userData') || '{}')
  
  if (!flag) {
    return <Navigate to="/login" />
  }
  
  if (userData.role !== 'admin' && !userData.email.includes('admin')) {
    return <Navigate to="/profile" />
  }
  
  return children
}

export default AdminRoute