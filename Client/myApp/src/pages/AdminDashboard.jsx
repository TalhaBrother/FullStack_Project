import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import Cookie from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Toast from '../components/Toast';
import NotificationBell from '../components/NotificationBell.jsx';
import { io } from "socket.io-client";
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
  const [recentUsers, setRecentUsers] = useState([]);
  const token = Cookie.get('token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        setRecentUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAction = async (u) => {
    const result = await Swal.fire({
      title: `<span class="text-slate-800 font-black">Manage User</span>`,
      html: `<p class="text-slate-500 font-medium">What would you like to do with <b>${u.username}</b>?</p>`,
      icon: 'question',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Update Details',
      denyButtonText: 'Delete User',
      confirmButtonColor: '#4f46e5',
      denyButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      customClass: {
        popup: 'rounded-[2rem] border-none shadow-2xl',
        confirmButton: 'rounded-xl font-bold px-6 py-3',
        denyButton: 'rounded-xl font-bold px-6 py-3',
        cancelButton: 'rounded-xl font-bold px-6 py-3'
      }
    });

    if (result.isConfirmed) {
      // UPDATE LOGIC
      const { value: formValues } = await Swal.fire({
        title: 'Update User Information',
        html:
          `<div class="space-y-4 text-left p-2">
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Username</label>
              <input id="swal-input1" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value="${u.username}">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Email</label>
              <input id="swal-input2" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value="${u.email}">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Contact</label>
              <input id="swal-input3" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value="${u.contact || ''}">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Role</label>
              <select id="swal-input4" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                <option value="parent" ${u.role === 'parent' ? 'selected' : ''}>Parent</option>
                <option value="tutor" ${u.role === 'tutor' ? 'selected' : ''}>Tutor</option>
                <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
              </select>
            </div>
          </div>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
        confirmButtonColor: '#4f46e5',
        customClass: {
          popup: 'rounded-[2.5rem] p-8',
          confirmButton: 'rounded-xl font-bold px-8 py-3 w-full mt-4'
        },
        preConfirm: () => {
          return {
            username: document.getElementById('swal-input1').value,
            email: document.getElementById('swal-input2').value,
            contact: document.getElementById('swal-input3').value,
            role: document.getElementById('swal-input4').value
          }
        }
      });

      if (formValues) {
        try {
          const res = await axios.put(`http://localhost:3000/users/update/${u._id}`, formValues, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data.code === 200) {
            Swal.fire({ title: 'Updated!', text: 'User has been updated.', icon: 'success', customClass: { popup: 'rounded-3xl' } });
            fetchUsers();
          }
        } catch (err) {
          Swal.fire('Error!', 'Failed to update user.', 'error');
        }
      }
    } else if (result.isDenied) {
      // DELETE LOGIC
      const confirmDelete = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#94a3b8',
        confirmButtonText: 'Yes, delete it!',
        customClass: { popup: 'rounded-[2rem]' }
      });

      if (confirmDelete.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:3000/users/delete/${u._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data.code === 200) {
            Swal.fire({ title: 'Deleted!', text: 'User has been removed.', icon: 'success', customClass: { popup: 'rounded-3xl' } });
            fetchUsers();
          }
        } catch (err) {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        }
      }
    }
  };

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
            <div className="relative">
              <NotificationBell />
            </div>
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
                    <tr key={u._id} className="group hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 uppercase">
                            {u.username.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-800">{u.username}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-sm font-semibold ${u.role === 'tutor' ? 'text-violet-600 bg-violet-50' : 'text-blue-600 bg-blue-50'} px-3 py-1 rounded-full uppercase`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-sm font-medium text-slate-700">Active</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500 font-medium">{u.email}</td>
                      <td className="px-8 py-5">
                        <button 
                          onClick={() => handleUserAction(u)}
                          className="text-slate-400 hover:text-indigo-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
                        >
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
