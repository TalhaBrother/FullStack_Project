import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import Navbar from "../components/Navbar.jsx";
import TutionPost from "../components/TutionPost.jsx"; // This is your tutions component
import TutorList from "../components/TutorList.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/authSlice';
import Tutions from "./tutions.jsx";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(null); // null, 'hire', or 'post'

  useEffect(() => {
    const token = Cookie.get("token");
    // Only fetch if we have a token but no user data yet
    if (!user && token) {
      dispatch(fetchUser());
    }
  }, [user, dispatch]);

  // Logic: Visible to 'parent' or 'admin', but NOT 'tutor'
  const canSeeParentOptions = user?.role === 'parent' || user?.role === 'admin';

  return (
    <div className="w-screen min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-indigo-50 to-white flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1. Navbar: Fixed height, consistent shadow */}
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 md:py-12 animate-in fade-in duration-700">
        {/* 2. Welcome Section */}
        <header className="mb-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <p className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Dashboard Overview</p>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">{user ? user.username : "Guest"}</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-xl font-medium">
                  {user?.role === 'parent' || user?.role === 'admin' 
                    ? "Choose an action to get started with your learning journey." 
                    : "Discover new teaching opportunities and manage your sessions."}
                </p>
              </div>
              
              {activeTab && canSeeParentOptions && (
                 <button 
                  onClick={() => setActiveTab(null)}
                  className="group flex items-center gap-3 bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm"
                 >
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Selection
                 </button>
              )}
           </div>
        </header>

        {/* 3. Dynamic Content */}
        <section className="relative">
          {canSeeParentOptions ? (
             !activeTab ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  {/* Option 1: Hire a Tutor */}
                  <div className="relative group cursor-pointer" onClick={() => setActiveTab("hire")}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white p-8 md:p-10 rounded-[2.25rem] border border-slate-100 flex flex-col items-start transition-all duration-500 transform group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-500">
                         <svg className="w-8 h-8 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Hire a Tutor</h2>
                      <p className="text-slate-500 text-lg leading-relaxed mb-8">
                        Connect with top-rated educators who specialize in your specific needs and learning style.
                      </p>
                      <span className="inline-flex items-center text-indigo-600 font-bold text-lg group-hover:translate-x-2 transition-transform">
                        Browse Marketplace
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </span>
                    </div>
                  </div>

                  {/* Option 2: Post a Tuition */}
                  <div className="relative group cursor-pointer" onClick={() => setActiveTab("post")}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white p-8 md:p-10 rounded-[2.25rem] border border-slate-100 flex flex-col items-start transition-all duration-500 transform group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-500">
                         <svg className="w-8 h-8 text-emerald-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Post a Tuition</h2>
                      <p className="text-slate-500 text-lg leading-relaxed mb-8">
                        Define your requirements, subject, and budget to let our network of expert tutors find you.
                      </p>
                      <span className="inline-flex items-center text-emerald-600 font-bold text-lg group-hover:translate-x-2 transition-transform">
                        Launch Request
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </span>
                    </div>
                  </div>
               </div>
             ) : (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                   {activeTab === "hire" ? <TutorList /> : <TutionPost />}
                </div>
             )
          ) : (
            user?.role === 'tutor' && (
              <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-100/50 flex items-center gap-6">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                       <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                       <p className="text-slate-900 font-black text-xl leading-tight">Tailored Opportunities</p>
                       <p className="text-slate-500 font-medium">Browse student requests that match your profile and expertise.</p>
                    </div>
                 </div>
                 <Tutions />
              </div>
            )
          )}

          {!user && (
            <div className="text-center py-24 px-4 bg-white/40 backdrop-blur-lg rounded-[3rem] border border-white/60 shadow-2xl">
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                Unlock Your <span className="text-indigo-600">Full Potential</span>
              </h2>
              <p className="text-slate-500 text-2xl max-w-3xl mx-auto leading-relaxed mb-12">
                Join the largest network of students and tutors in Pakistan. Experience learning like never before.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-indigo-100 text-lg">
                    Get Started Free
                 </button>
                 <button className="px-8 py-4 border-2 border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-white transition-all duration-300 text-lg">
                    Learn How it Works
                 </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;