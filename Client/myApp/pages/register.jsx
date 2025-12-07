import React from 'react';
import * as yup from 'yup';
import Cookie from "js-cookie";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  let navigate = useNavigate();
  const registerSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    age: yup.number().positive().required("Age is required"),
    contact: yup.string().required("Contact is required"),
    password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/^[a-zA-Z0-9]{6,30}$/, "Password must be alphanumeric")
      .required("Password is required")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange"
  });

  let registerFormSubmit = async (data) => {
    try {
      let response = await axios.post("http://localhost:3000/user/register", data);
      Cookie.set("token", response.data.token);
      navigate("/");
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-8 text-lg">Join us today and get started</p>
        
        <form onSubmit={handleSubmit(registerFormSubmit)} className="space-y-6 sm:space-y-7">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Username</label>
            <input 
              placeholder='Enter your username' 
              {...register("username")}
              className="w-full px-5 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base sm:text-lg transition duration-200"
            />
            {errors.username && <span className="text-red-500 text-sm sm:text-base mt-2 block">{errors.username.message}</span>}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Email</label>
            <input 
              type='email'
              placeholder='Enter your email' 
              {...register("email")}
              className="w-full px-5 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base sm:text-lg transition duration-200"
            />
            {errors.email && <span className="text-red-500 text-sm sm:text-base mt-2 block">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Age</label>
            <input 
              type='number'
              placeholder='Enter your age' 
              {...register("age")}
              className="w-full px-5 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base sm:text-lg transition duration-200"
            />
            {errors.age && <span className="text-red-500 text-sm sm:text-base mt-2 block">{errors.age.message}</span>}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Contact</label>
            <input 
              placeholder='Enter your phone number' 
              {...register("contact")}
              className="w-full px-5 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base sm:text-lg transition duration-200"
            />
            {errors.contact && <span className="text-red-500 text-sm sm:text-base mt-2 block">{errors.contact.message}</span>}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Password</label>
            <input 
              type='password' 
              placeholder='Enter your password' 
              {...register("password")}
              className="w-full px-5 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base sm:text-lg transition duration-200"
            />
            {errors.password && <span className="text-red-500 text-sm sm:text-base mt-2 block">{errors.password.message}</span>}
          </div>

          <button 
            type='submit'
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg rounded-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Register Now
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm sm:text-base mt-8">
          Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-700 hover:underline font-semibold">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
