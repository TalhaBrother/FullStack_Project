import React, { useEffect } from "react";
import Cookie from "js-cookie";
import Navbar from "../components/Navbar.jsx";
import TutionPost from "../components/TutionPost.jsx"; // This is your tutions component
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/authSlice';
import Tutions from "./tutions.jsx";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = Cookie.get("token");
    // Only fetch if we have a token but no user data yet
    if (!user && token) {
      dispatch(fetchUser());
    }
  }, [user, dispatch]);

  // Logic: Visible to 'parent' or 'admin', but NOT 'tutor'
  const canSeeTuition = user?.role === 'parent' || user?.role === 'admin';

  return (
    <div className="w-screen min-h-screen bg-gray-50 flex flex-col">
      {/* 1. Navbar: Visible to everyone */}
      <Navbar />

      <main className="flex-1 w-full p-4">
        {/* 2. Welcome Message (Optional) */}
        <h1 className="text-2xl font-bold my-4">
          Welcome, {user ? user.name : "Guest"}
        </h1>

        {/* 3. Tuition Component: Only for Parent and Admin */}
        {canSeeTuition ? (
          <TutionPost />
        ) : (
          user && <p className="text-red-500">Tutors cannot view or create tuition posts.</p>
        )}

        {/* 4. Other content for Tutors or Guests can go here */}
        {(user?.role === 'tutor' || user?.role === 'admin') && (
           <div className="bg-white p-6 shadow rounded">
             <Tutions />
           </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;