import { Navigate, Outlet } from 'react-router-dom';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/authSlice';

const ProtectedRoute = ({ children }) => {
  const token = Cookie.get('token');
  const { user, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !user && status === 'idle') {
      dispatch(fetchUser());
    }
  }, [token, user, status, dispatch]);

  // If there's no token, redirect to the login page immediately
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // While fetching user data, show a loading state to prevent flashing
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If fetch failed and we have no user, redirect to login (token might be invalid)
  if (status === 'failed' && !user) {
    Cookie.remove('token'); // Clear invalid token
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children or the nested routes via Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
