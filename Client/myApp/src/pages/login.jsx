
import * as yup from 'yup'
import Cookie from "js-cookie"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/authSlice';

const Login=()=>{
  let navigate=useNavigate()
  const dispatch = useDispatch();
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
        dispatch(fetchUser());
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back.',
          confirmButtonColor: '#4f46e5',
        }).then(() => {
          navigate("/")
        });
    } catch (error) {
        let errorMessage = "Login Failed! " + error.message;
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
          confirmButtonColor: '#4f46e5',
        });
        console.error("LoginFormSubmitError!",error.message)
    }
  }
  useEffect(() => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'Please login to continue',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }, []);
   return (
  <div className="w-screen min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-indigo-50 to-white flex flex-col font-sans">
    <Navbar />

    <div className="flex-1 flex items-center justify-center p-6 md:p-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="w-full max-w-xl bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/60 shadow-2xl shadow-indigo-100/50 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Visual Accent (Hidden on mobile) */}
        <div className="hidden md:flex w-1/3 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
           <div className="relative z-10">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight">Secure Access</h2>
           </div>
           <p className="relative z-10 text-slate-400 text-xs font-bold uppercase tracking-widest">Protected by Project™</p>
        </div>

        {/* Right Form Area */}
        <div className="flex-1 p-10 md:p-14 bg-white/80">
          <header className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 font-medium">
              Enter your credentials to access your dashboard.
            </p>
          </header>

          <form
            onSubmit={handleSubmit(loginFormSubmit)}
            className="space-y-8"
          >
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-900 uppercase tracking-widest pl-1">
                Username
              </label>
              <input
                placeholder="Type your username"
                {...register("username")}
                className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl
                           focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none
                           font-bold transition-all duration-300 shadow-sm"
              />
              {errors.username && (
                <span className="text-red-500 text-xs font-bold mt-2 block pl-1">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-900 uppercase tracking-widest pl-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl
                           focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none
                           font-bold transition-all duration-300 shadow-sm"
              />
              {errors.password && (
                <span className="text-red-500 text-xs font-bold mt-2 block pl-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Action Group */}
            <div className="pt-4 flex flex-col gap-6">
              <button
                type="submit"
                className="group w-full relative py-5 bg-slate-900 text-white font-black rounded-2xl 
                           overflow-hidden shadow-2xl shadow-indigo-100 transition-all hover:bg-slate-800 active:scale-[0.98]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center justify-center gap-2 text-lg">
                  Login to Account
                  <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </button>

              <p className="text-center text-slate-500 font-bold text-sm">
                New here?{" "}
                <a
                  href="/register"
                  className="text-indigo-600 hover:text-slate-900 transition-colors"
                >
                  Create an account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

}
export default Login;