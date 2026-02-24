import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
  const { role } = useSelector((state) => state.user);

  if (!token && role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;