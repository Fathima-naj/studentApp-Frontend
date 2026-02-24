import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnData } from "../redux/studentSlice";
import { axiosInstance } from "../auth/axiosInstance";
import StudentNavbar from "../components/studentNavbar";

function StudentDashboard() {
  const dispatch = useDispatch();
  const { student, loading, error } = useSelector((state) => state.student);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    password: "", 
  });

  useEffect(() => {
    dispatch(getOwnData());
  }, [dispatch]);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        course: student.course,
        password: "", 
      });
    }
  }, [student]);

  const handleUpdate = async () => {
    try {
     
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;

      const res = await axiosInstance.put(`/student/update`, updateData);
      console.log("Updated:", res.data);
      setShowModal(false);
      dispatch(getOwnData()); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <StudentNavbar/>
      {student && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">{student.name}</h2>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> {student.email}</p>
          <p className="text-gray-600 mb-4"><strong>Course:</strong> {student.course}</p>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#913743] text-white px-4 py-2 rounded-lg hover:bg-[#914a54] w-full"
          >
            Update
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white w-full max-w-md mx-4 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-center">Update Student Info</h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                placeholder="Course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="password"
                placeholder="New Password (leave blank if no change)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#913743] text-white rounded-lg hover:bg-[#914a54]"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;