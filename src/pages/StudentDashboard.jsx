import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnData } from "../redux/studentSlice";
import { axiosInstance } from "../auth/axiosInstance";
import StudentNavbar from "../components/StudentNavbar";

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

  // Fetch student data
  useEffect(() => {
    dispatch(getOwnData());
  }, [dispatch]);

  // Fill form if student exists
 useEffect(() => {
  if (student) {
    // If profile exists → fill form
    setFormData({
      name: student.name || "",
      email: student.email || "",
      course: student.course || "",
      password: "",
    });
  } else {
    // 🔥 If no profile → clear form
    setFormData({
      name: "",
      email: "",
      course: "",
      password: "",
    });
  }
}, [student]);

  // Handle create OR update
 const handleSubmitData = async () => {
  try {
    const submitData = { ...formData };

    if (!submitData.password) {
      delete submitData.password;
    }

    const res = await axiosInstance.put(
      "/student/update",
      submitData
    );

    console.log(res.data);
    setShowModal(false);
    dispatch(getOwnData());

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Operation failed");
  }
};

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <StudentNavbar />

      {student ? (
        // If student profile exists
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">{student.name}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {student.email}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Course:</strong> {student.course}
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#913743] text-white px-4 py-2 rounded-lg hover:bg-[#914a54] w-full"
          >
            Update
          </button>
        </div>
      ) : (
        // If no student profile
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">No Profile Found</h2>

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
          >
            Add Your Details
          </button>
        </div>
      )}

      {/* Modal for Add / Update */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white w-full max-w-md mx-4 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {student ? "Update Student Info" : "Add Student Info"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                placeholder="Course"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="password"
                placeholder="New Password (leave blank if no change)"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
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
                onClick={handleSubmitData}
                className="px-4 py-2 bg-[#913743] text-white rounded-lg hover:bg-[#914a54]"
              >
                {student ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;