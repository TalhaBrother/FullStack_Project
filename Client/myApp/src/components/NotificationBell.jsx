// components/NotificationBell.jsx
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { FiBell } from "react-icons/fi";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const { user } = useSelector((state) => state.auth);
  const token = Cookie.get("token");

  // Fetch existing notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get("http://localhost:3000/notifications", { headers });
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
  }, [token]);

  // Listen for real-time notifications
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("notification", (data) => {
      // Role-based filtering for real-time events (handle targetRole as array)
      const canSee = !data.targetRole || 
                     data.targetRole.includes('all') || 
                     (user && data.targetRole.includes(user.role));
      
      if (canSee) {
        setNotifications((prev) => [data, ...prev]);
      }
    });
    return () => socket.disconnect();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = async () => {
    setIsOpen((prev) => !prev);
    // Mark all as read when panel opens
    if (!isOpen && unreadCount > 0) {
      try {
        await axios.patch("http://localhost:3000/notifications/mark-read");
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

  const formatTime = (dateStr) => {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={handleOpen}
        className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
            {notifications.length === 0 ? (
              <div className="px-5 py-8 text-center text-slate-400 text-sm font-medium">
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`px-5 py-3.5 flex gap-3 items-start transition-colors ${
                    !n.read ? "bg-indigo-50/50" : "hover:bg-slate-50"
                  }`}
                >
                  {/* Icon dot */}
                  <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0 opacity-70" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 font-medium leading-snug">
                      {n.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">
                      {formatTime(n.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-400 font-medium">
                Showing {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;