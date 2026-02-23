import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudents,
  deleteStudent,
  createStudent,
  updateStudent
} from "../redux/studentSlice";
import Navbar from "../components/Navbar";

function Dashboard() {
  const dispatch = useDispatch();
  const { students, loading } = useSelector(
    (state) => state.student
  );

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    course: ""
  });

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const openCreateModal = () => {
    setEditId(null);
    setFormData({ name: "", course: "" });
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setEditId(student._id);
    setFormData({
      name: student.name,
      course: student.course
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (editId) {
      dispatch(updateStudent({ id: editId, formData }));
    } else {
      dispatch(createStudent(formData));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen  p-32">
      <div className="max-w-full mx-auto bg-white p-6 rounded-xl shadow-md">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Students List</h2>
          <button
            onClick={openCreateModal}
            className="bg-[#913743] text-white px-4 py-2 rounded-lg hover:bg-[#914a54] transition"
          >
            + Create Student
          </button>
        </div>

        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-semibold">{student.name}</p>
                <p className="text-gray-500">{student.course}</p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => openEditModal(student)}
                  className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(student._id)}
                  className="bg-[#e80c29] text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-40">
          <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Update Student" : "Create Student"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                placeholder="Course"
                value={formData.course}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    course: e.target.value
                  })
                }
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#913743] text-white rounded-lg hover:bg-[#914a54]"
              >
                {editId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Dashboard;