import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { registerUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    navigate('/')
  };

  return (

    <div className="min-h-screen flex items-center justify-center ">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      
      <h2 className="text-2xl font-bold text-center mb-6">
        Register
      </h2>

      {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
          {error.message || error}
        </p>
      )}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <input
       placeholder="Name" 
       {...register("name")}
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
       />
      <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>

      <input
       placeholder="Email" 
       {...register("email")} 
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
       />
      <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
         className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>

      <button 
      type="submit" 
      disabled={loading}
      className="w-full bg-[#913743] text-white p-3 rounded-lg hover:bg-[#914a54] transition disabled:bg-gray-400"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/" 
         className="text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>

    </form>
    </div>
    </div>
  );
}

export default Register;