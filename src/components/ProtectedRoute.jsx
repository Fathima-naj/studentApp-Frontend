import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const {role}=useSelector((state)=>state.user)
  if (!token && role!=="user") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;