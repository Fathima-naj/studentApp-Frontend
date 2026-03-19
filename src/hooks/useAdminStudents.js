import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../redux/adminSlice";

export const useAdminStudents = (studentsPerPage = 5) => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterCourse === "All" || student.course === filterCourse;
      return matchesSearch && matchesFilter;
    });
  }, [students, searchTerm, filterCourse]);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const courses = useMemo(
    () => [...new Set(students.map((s) => s.course))],
    [students]
  );

  return {
    students: currentStudents,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterCourse,
    setFilterCourse,
    currentPage,
    setCurrentPage,
    totalPages,
    courses,
  };
};