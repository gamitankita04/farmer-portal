import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";

function ProtectedRoute({ children }) {
  const { flag } = useContext(LoginContext);
  return flag === 1 ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
