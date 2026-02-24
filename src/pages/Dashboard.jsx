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
  const { students, loading } = useSelector((state) => state.student);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    course: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

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

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterCourse === "All" || student.course === filterCourse;

    return matchesSearch && matchesFilter;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 px-4 py-6 sm:px-8 md:px-16 lg:px-32">
        <div className="w-full mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md">

          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">

            {/* Search & Filter */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 p-2 rounded-lg w-full sm:w-64"
              />

              <select
                value={filterCourse}
                onChange={(e) => {
                  setFilterCourse(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 p-2 rounded-lg w-full sm:w-48"
              >
                <option value="All">All Courses</option>
                {[...new Set(students.map((s) => s.course))].map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={openCreateModal}
              className="bg-[#913743] text-white px-4 py-2 rounded-lg hover:bg-[#914a54] transition w-full sm:w-auto"
            >
              + Create Student
            </button>
          </div>

          {/* Student List */}
          <div className="space-y-4">
            {currentStudents.map((student) => (
              <div
                key={student._id}
                className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-gray-500">{student.course}</p>
                </div>

                <div className="flex gap-2">
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

          {/* Pagination */}
          <div className="flex flex-wrap justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-[#913743] text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white w-full max-w-md mx-4 p-6 rounded-xl shadow-xl">
              <h3 className="text-xl font-semibold mb-4">
                {editId ? "Update Student" : "Create Student"}
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
                  type="text"
                  placeholder="Course"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
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