import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TutorList = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/tutors');
                setTutors(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch tutors. Please try again later.');
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold tracking-tight">Curating your expert list...</p>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border border-red-100 p-8 rounded-[2rem] text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-black text-red-900 mb-2">Network Error</h3>
            <p className="text-red-700 font-medium">{error}</p>
        </div>
    );

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Top Rated Tutors</h2>
                <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-slate-500 font-bold text-sm shadow-sm">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                   {tutors.length} Live Tutors Available
                </div>
            </div>

            {tutors.length === 0 ? (
                <div className="text-center py-20 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                         <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13.481 4.044a3 3 0 00-4.962 0m0 0a3 3 0 000 4.412m4.962-4.412a3 3 0 010 4.412" /></svg>
                    </div>
                    <h3 className="text-2xl font-black text-slate-700 mb-2 tracking-tight">Quiet Marketplace</h3>
                    <p className="text-slate-400 text-lg max-w-sm mx-auto font-medium lowercase italic leading-tight">We couldn't find any tutors matching your profile at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutors.map((tutor) => (
                        <div key={tutor._id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 overflow-hidden flex flex-col h-full active:scale-[0.98]">
                            {/* Card Header Section */}
                            <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-white p-8 flex flex-col items-center border-b border-slate-50">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                    <div className="relative w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-2xl transition-transform duration-700 group-hover:rotate-[360deg]">
                                        {tutor.profilePic?.url ? (
                                            <img src={tutor.profilePic.url} alt={tutor.username} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white text-4xl font-black">
                                                {tutor.username.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                                </div>
                                <h3 className="mt-6 text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-none uppercase">{tutor.username}</h3>
                                <p className="mt-2 px-4 py-1.5 bg-indigo-600 text-white font-black text-[10px] rounded-full uppercase tracking-widest shadow-lg shadow-indigo-100">Verified Instructor</p>
                            </div>
                            
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl group/link cursor-pointer overflow-hidden border border-transparent hover:border-indigo-100 transition-all">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover/link:text-indigo-600 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </div>
                                        <span className="text-slate-600 font-bold truncate group-hover/link:text-indigo-900 transition-colors">{tutor.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl group/link cursor-pointer overflow-hidden border border-transparent hover:border-indigo-100 transition-all">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover/link:text-indigo-600 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        </div>
                                        <span className="text-slate-600 font-bold truncate group-hover/link:text-indigo-900 transition-colors">{tutor.contact}</span>
                                    </div>
                                </div>
                                
                                <button className="mt-auto w-full group/btn relative py-4 bg-slate-900 text-white font-black rounded-2xl overflow-hidden shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 active:bg-slate-900">
                                   <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                                   <span className="relative flex items-center justify-center gap-2">
                                      Hire Now
                                      <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                   </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TutorList;
