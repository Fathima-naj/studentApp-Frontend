import { useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent, updateStudent, deleteStudent } from "../redux/adminSlice";

export const useAdminStudentForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  const [editId, setEditId] = useState(null);

  const openForm = (student = null) => {
    if (student) {
      setEditId(student._id);
      setFormData({
        name: student.name,
        email: student.email,
        course: student.course,
      });
    } else {
      setEditId(null);
      setFormData({ name: "", email: "", course: "" });
    }
  };

  const handleSubmit = async (closeModal) => {
    if (!formData.name || !formData.email || !formData.course) {
      alert("All fields are required");
      return;
    }

    if (editId) {
      await dispatch(updateStudent({ id: editId, formData }));
    } else {
      await dispatch(createStudent(formData));
    }

    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await dispatch(deleteStudent(id));
    }
  };

  return {
    formData,
    setFormData,
    editId,
    openForm,
    handleSubmit,
    handleDelete,
  };
};