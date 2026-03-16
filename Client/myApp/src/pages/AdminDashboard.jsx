import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import Cookie from 'js-cookie';
import { io } from "socket.io-client";
import { toast } from 'react-toastify';
import Toast from '../components/Toast';
import {
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiActivity,
  FiHome,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
  FiMenu,
  FiX
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'admin') {
  
      navigate('/');
     
    }
    if(user && user.role==='admin'){
      const socket = io("http://localhost:3000");
     socket.on("notification", (data) => {
        console.log("Notification:", data);
        toast.info(data.message || "New activity on the portal!", {
                icon: "🚀"
            });
      });
      return () => {
        socket.off("notification");
      };
    }
       
  }, [user, navigate]);


  const handleLogout = () => {
    dispatch(logout());
    Cookie.remove('token');
    navigate('/login');
  };


  const stats = [
    { title: 'Total Students', value: '1,284', icon: <FiUsers className="w-6 h-6" />, color: 'bg-blue-500' },
    { title: 'Active Tutors', value: '432', icon: <FiBookOpen className="w-6 h-6" />, color: 'bg-emerald-500' },
    { title: 'Revenue', value: '$12,850', icon: <FiDollarSign className="w-6 h-6" />, color: 'bg-indigo-500' },
    { title: 'Engagements', value: '89.5%', icon: <FiActivity className="w-6 h-6" />, color: 'bg-rose-500' },
  ];

  const recentUsers = [
    { id: 1, name: 'Ahmed Khan', role: 'Tutor', status: 'Active', email: 'ahmed@example.com' },
    { id: 2, name: 'Sara Ali', role: 'Student', status: 'Pending', email: 'sara@example.com' },
    { id: 3, name: 'Zain Malik', role: 'Tutor', status: 'Active', email: 'zain@example.com' },
    { id: 4, name: 'Fatima Zahra', role: 'Student', status: 'Inactive', email: 'fatima@example.com' },
    { id: 5, name: 'Bilal Sheikh', role: 'Student', status: 'Active', email: 'bilal@example.com' },
  ];



  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
     
            <Toast />
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
                A
              </div>
              <span className="text-xl font-black text-slate-800 tracking-tight">AdminPanel</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            <SidebarItem icon={<FiHome />} label="Admin Dashboard" to="/admin" active={location.pathname === '/admin'} />
            <SidebarItem icon={<FiActivity />} label="Main Site" to="/" />
            <SidebarItem icon={<FiBookOpen />} label="Tuitions" to="/tutions" />
            <SidebarItem icon={<FiUsers />} label="Profile" to="/profile" />
            <SidebarItem icon={<FiBell />} label="Chat" to="/chat" />
            <div className="pt-4 border-t border-slate-100 mt-4">
              <SidebarItem icon={<FiLogOut />} label="Logout" onClick={handleLogout} />
            </div>
          </nav>

          <div className="p-4 m-4 bg-indigo-600 rounded-2xl text-white">
            <p className="text-sm font-medium opacity-80 mb-2">Need help?</p>
            <p className="text-xs mb-4">Check our administrative guide for advanced features.</p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-all">
              Read Docs
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-xl group focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <FiSearch className="text-slate-400 group-focus-within:text-indigo-600" />
              <input type="text" placeholder="Search anything..." className="bg-transparent border-none focus:ring-0 ml-2 text-sm text-slate-700 w-64" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
              <FiBell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="hidden md:block text-right text-sm">
                <p className="font-bold text-slate-800">{user?.username || 'Admin'}</p>
                <p className="text-slate-500 text-xs">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden border border-slate-300">
                <img src={`https://ui-avatars.com/api/?name=${user?.username || 'Admin'}&background=random`} alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Overview</h1>
            <p className="text-slate-500 font-medium">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <span className="text-emerald-500 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
                </div>
                <p className="text-slate-500 font-medium text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Recent Users</h2>
                <p className="text-sm text-slate-500 font-medium">A list of all recently joined students and tutors.</p>
              </div>
              <button className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100">
                View All Users
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentUsers.map((u) => (
                    <tr key={u.id} className="group hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                            {u.name.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-800">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-sm font-semibold ${u.role === 'Tutor' ? 'text-violet-600 bg-violet-50' : 'text-blue-600 bg-blue-50'} px-3 py-1 rounded-full`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : u.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
                          <span className="text-sm font-medium text-slate-700">{u.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500 font-medium">{u.email}</td>
                      <td className="px-8 py-5">
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                          <FiSettings className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false, to, onClick }) => {
  const content = (
    <>
      <span className={`text-xl ${active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`}>{icon}</span>
      <span className="font-bold">{label}</span>
    </>
  );

  const className = `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-slate-100'}`;

  if (to) {
    return <Link to={to} className={className}>{content}</Link>;
  }
  return <button onClick={onClick} className={className}>{content}</button>;
};

export default AdminDashboard;
