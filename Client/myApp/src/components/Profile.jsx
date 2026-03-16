import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookie.remove("token");
        dispatch(logout());
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-slate-200">
                <p className="text-slate-500 font-medium italic">Please sign in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-100/50 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Avatar / Initial Circle */}
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
                    <span className="text-4xl font-black text-white uppercase">
                        {user.username?.charAt(0) || user.email?.charAt(0) || '?'}
                    </span>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        {user.username || 'User Profile'}
                    </h2>
                    <p className="text-indigo-600 font-bold tracking-widest uppercase text-xs flex items-center justify-center sm:justify-start gap-2">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                        {user.role || 'Member'}
                    </p>
                    <p className="text-slate-500 font-medium text-lg mt-2">
                        {user.email}
                    </p>
                </div>
            </div>

            <hr className="my-8 border-slate-100" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Account Status</p>
                    <p className="text-slate-900 font-black">Active</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Member Since</p>
                    <p className="text-slate-900 font-black">March 2024</p>
                </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-100">
                    Edit Profile
                </button>
                <button 
                    onClick={handleLogout}
                    className="flex-1 px-8 py-4 border-2 border-slate-200 text-red-500 font-black rounded-2xl hover:bg-red-50 hover:border-red-100 transition-all duration-300"
                >
                    Logout Account
                </button>
            </div>
        </div>
    );
};

export default Profile;
