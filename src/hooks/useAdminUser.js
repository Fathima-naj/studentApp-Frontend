import { useState, useEffect } from "react";
import { axiosInstance } from "../auth/axiosInstance";

export const useAdminUsers = (limit = 5) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axiosInstance.get(`/admin/getUser`, {
        params: { page, search, role, sort, limit },
        headers: { Authorization: `Bearer ${token}` },
      });

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

  return {
    users,
    loading,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    role,
    setRole,
    sort,
    setSort,
  };
};