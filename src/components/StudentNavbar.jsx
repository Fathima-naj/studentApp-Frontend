import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

function StudentNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-8 py-4 flex justify-between items-center z-50">
      <h1 className="text-xl font-bold text-blue-600">
        StudentApp
      </h1>

      <div className="flex items-center space-x-6">
        <Link
          to="/studentDashboard"
          className="text-gray-700 hover:text-[#913743] font-medium"
        >
          Dashboard
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default StudentNavbar;