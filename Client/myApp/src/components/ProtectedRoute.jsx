import { Navigate, Outlet } from 'react-router-dom';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/authSlice';

const ProtectedRoute = ({ children }) => {
  const token = Cookie.get('token');
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [token, user, dispatch]);

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children or the nested routes via Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
