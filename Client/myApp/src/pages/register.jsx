import React, { use } from 'react';
import * as yup from 'yup';
import Cookie from "js-cookie";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Swal from 'sweetalert2';

const Register = () => {
  let navigate = useNavigate();
  const registerSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    role: yup.string().oneOf(['parent', 'tutor'], "Role is required").required("Role is required"),
    contact: yup.string().matches(/^[0-9]{10}$/, "Contact must be 10 digits").required("Contact is required"),
    password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/^[a-zA-Z0-9]{6,30}$/, "Password must be alphanumeric")
      .required("Password is required"),
    profilePic: yup.mixed().notRequired()
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange"
  });

 let registerFormSubmit = async (data) => {
  try {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("contact", data.contact);
    formData.append("password", data.password);

    // 👇 IMPORTANT: file comes as array
    if (data.profilePic && data.profilePic.length > 0) {
      formData.append("profilePic", data.profilePic[0]);
    }

    let response = await axios.post(
      "http://localhost:3000/user/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    Cookie.set("token", response.data.token);
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'You have been registered successfully.',
      confirmButtonColor: '#4f46e5',
    }).then(() => {
      navigate("/login");
    });
  } catch (error) {
    let errorMessage = "Registration failed. Please try again.";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: errorMessage,
      confirmButtonColor: '#4f46e5',
    });
  }
};
   return (
    <div className='w-screen min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-indigo-50 to-white flex flex-col font-sans'>
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-full max-w-4xl bg-white/40 backdrop-blur-2xl rounded-[3.5rem] border border-white/60 shadow-2xl shadow-indigo-100/50 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Brand Accent */}
          <div className="hidden md:flex w-1/3 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-24 -mt-24"></div>
             <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-900/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                </div>
                <h2 className="text-3xl font-black text-white leading-tight tracking-tight">Expand Your <span className="text-emerald-400">Horizons</span></h2>
             </div>
             <p className="relative z-10 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Verified Network • Project™</p>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-10 md:p-16 bg-white/80">
            <header className="mb-12">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Create Account</h1>
              <p className="text-slate-500 font-bold text-lg">Join the fastest growing education marketplace.</p>
            </header>

            <form onSubmit={handleSubmit(registerFormSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {/* Username */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-widest pl-1">Username</label>
                  <input
                    placeholder='johndoe'
                    {...register("username")}
                    className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none font-bold transition-all shadow-sm"
                  />
                  {errors.username && <span className="text-red-500 text-xs font-bold mt-2 block pl-1">{errors.username.message}</span>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-widest pl-1">Email Address</label>
                  <input
                    type='email'
                    placeholder='john@example.com'
                    {...register("email")}
                    className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none font-bold transition-all shadow-sm"
                  />
                  {errors.email && <span className="text-red-500 text-xs font-bold mt-2 block pl-1">{errors.email.message}</span>}
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-widest pl-1">I am a...</label>
                  <select
                    {...register("role")}
                    className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none font-bold transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="">Select Role</option>
                    <option value="parent">Parent</option>
                    <option value="tutor">Tutor</option>
                  </select>
                  {errors.role && <span className="text-red-500 text-xs font-bold mt-2 block pl-1">{errors.role.message}</span>}
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-widest pl-1">Contact Number</label>
                  <input
                    placeholder='03XXXXXXXXX'
                    {...register("contact")}
                    className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none font-bold transition-all shadow-sm"
                  />
                  {errors.contact && <span className="text-red-500 text-xs font-bold mt-2 block pl-1">{errors.contact.message}</span>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-widest pl-1">Secure Password</label>
                  <input
                    type='password'
                    placeholder='••••••••'
                    {...register("password")}
                    className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none font-bold transition-all shadow-sm"
                  />
                  {errors.password && <span className="text-red-500 text-xs font-bold mt-2 block pl-1">{errors.password.message}</span>}
                </div>

                {/* Profile Pic */}
                <div className="space-y-2">
                   <label className="text-xs font-black text-slate-900 uppercase tracking-widest pl-1">Profile Photo</label>
                   <div className="relative group/file">
                      <input
                        type="file"
                        accept="image/*"
                        {...register("profilePic")}
                        className="w-full text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-2xl transition-all"
                      />
                   </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type='submit'
                  className="group w-full relative py-5 bg-slate-900 text-white font-black rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100 transition-all hover:bg-slate-800 active:scale-[0.98]"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center justify-center gap-3 text-lg">
                    Complete Registration
                    <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                </button>
                
                <p className="text-center text-slate-500 font-bold text-sm mt-8">
                  Member already? <a href="/login" className="text-indigo-600 hover:text-slate-900 transition-colors">Login to account</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
