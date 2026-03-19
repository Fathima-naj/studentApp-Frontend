import { useState, useEffect } from "react";
import { axiosInstance } from "../auth/axiosInstance";

export const useStudentForm = (student, refreshData, closeModal) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    password: "",
    profileImage: null,
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        course: student.course || "",
        password: "",
        profileImage: null,
      });
    }
  }, [student]);

  // ...existing code

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("course", formData.course);

      if (formData.password) data.append("password", formData.password);
      if (formData.profileImage) data.append("profileImage", formData.profileImage);

      await axiosInstance.put("/student/update", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      refreshData();
      closeModal(); // ✅ close modal after successful update
    } catch (err) {
      console.error(err);
    }
  };

  return { formData, setFormData, handleSubmit };
};


  