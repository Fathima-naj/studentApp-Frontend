import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnData } from "../redux/studentSlice";

export const useStudentData = () => {
  const dispatch = useDispatch();
  const { student, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getOwnData());
  }, [dispatch]);

  return { student, loading, error, refresh: () => dispatch(getOwnData()) };
};