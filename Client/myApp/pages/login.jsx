
import * as yup from 'yup'
import Cookie from "js-cookie"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const Login=()=>{
  let navigate=useNavigate()
const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(6).matches(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange"
  });
  let loginFormSubmit=async(data)=>{
    try {
        let response=await axios.post("http://localhost:3000/user/login",data)
        console.log(response.data)
        Cookie.set("token",response.data.token)
        toast.success("Login Successful!")
        navigate("/")
    } catch (error) {
      toast.error("Login Failed! "+error.message)
        console.error("LoginFormSubmitError!",error.message)
    }
  }
  useEffect(() => {
    toast.info("Please login to continue");
  }, []);
   return (
  <div className="w-screen">
    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12">
        
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8 text-lg">
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit(loginFormSubmit)}
          className="space-y-6 sm:space-y-7"
        >
          {/* Username */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              placeholder="Enter your username"
              {...register("username")}
              className="w-full text-black px-5 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
                         text-base sm:text-lg transition duration-200"
            />
            {errors.username && (
              <span className="text-red-500 text-sm sm:text-base mt-2 block">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full text-black px-5 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
                         text-base sm:text-lg transition duration-200"
            />
            {errors.password && (
              <span className="text-red-500 text-sm sm:text-base mt-2 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800
                       text-white font-bold py-3 sm:py-4 px-6 sm:px-8
                       text-base sm:text-lg rounded-lg transition duration-200
                       ease-in-out transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm sm:text-base mt-8">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:text-indigo-700 hover:underline font-semibold"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  </div>
);

}
export default Login;