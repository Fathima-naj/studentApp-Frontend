import { useEffect, useState } from "react";
import { axiosInstance } from "../auth/axiosInstance";
import Navbar from "../components/Navbar";
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(false);

  const limit = 5;

const fetchUsers = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await axiosInstance.get(`/admin/getUser`, {
      params: {
        page,
        search,
        role,
        sort,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API RESPONSE:", res.data);

    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);   

  } catch (error) {
    console.log("ERROR RESPONSE:", error.response);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, [page, search, role, sort]);

  console.log('users:',users)
  return (
    <div className="p-6 max-w-7xl mx-auto">
        <Navbar/>
      <h2 className="pt-24 text-2xl text-[#420309] font-bold mb-4">Users List</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name/email"
          className="border border-[#660d16] px-3 py-2 rounded-md w-64 focus:outline-none focus:border-2 focus:border-[#660d16]"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="border border-[#660d16] px-3 py-2 rounded-md"
          value={role}
          onChange={(e) => {
            setPage(1);
            setRole(e.target.value);
          }}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          className="border border-[#660d16] px-3 py-2 rounded-md"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-[#420309]">SI.No</th>
              <th className="px-4 py-3 text-[#420309]">Name</th>
              <th className="px-4 py-3 text-[#420309]">Email</th>
              <th className="px-4 py-3 text-[#420309]">Role</th>
              <th className="px-4 py-3 text-[#420309]">Created At</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.role === "admin"
                          ? "bg-[#f7c7c6] font-bold text-[#420309]"
                          : "bg-[#e6baba] font-bold text-[#420309]"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 text-[#913743] rounded disabled:opacity-50"
        >
          <CircleArrowLeft/>
        </button>

        <span className="text-sm text-[#420309]">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 text-[#913743] rounded disabled:opacity-50"
        >
          <CircleArrowRight/>
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;