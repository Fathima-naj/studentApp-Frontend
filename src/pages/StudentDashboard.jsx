import React from "react";
import StudentNavbar from "../components/StudentNavbar";
import { useStudentData } from "../hooks/useStudentData";
import { useModal } from "../hooks/useModal";
import { useStudentForm } from "../hooks/useStudentForm";

function StudentDashboard() {
  const { student, loading, error, refresh } = useStudentData();
  const { isOpen, openModal, closeModal } = useModal(false);
const { formData, setFormData, handleSubmit } = useStudentForm(student, refresh, closeModal);
const handleFormSubmit = async () => {
  await handleSubmit();
  closeModal(); 
};
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <StudentNavbar />

      {student ? (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          {student.profileImage && (
            <img
              src={student.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
            />
          )}
          <h2 className="text-2xl font-bold mb-4 text-center">{student.name}</h2>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> {student.email}</p>
          <p className="text-gray-600 mb-4"><strong>Course:</strong> {student.course}</p>
          <button onClick={openModal} className="bg-[#913743] text-white px-4 py-2 rounded-lg hover:bg-[#914a54] w-full">
            Update
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">No Profile Found</h2>
          <button onClick={openModal} className="bg-[#913743] text-white px-4 py-2 rounded-lg hover:bg-[#914a54] w-full">
            Add Your Details
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white w-full max-w-md mx-4 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-center">{student ? "Update Student Info" : "Add Student Info"}</h3>

            <div className="space-y-3">
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Course" value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="file" onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })} />
              <input type="password" placeholder="New Password (leave blank if no change)" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>
              <button onClick={handleFormSubmit} className="px-4 py-2 bg-[#913743] text-white rounded-lg hover:bg-[#914a54]">
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