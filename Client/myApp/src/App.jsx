
import './App.css'
import {Route,Routes} from "react-router"
import Register from "./pages/register.jsx"
import Login from "./pages/login.jsx"
import Chat from './pages/chat.jsx'
import LandingPage from './pages/landingPage.jsx'
import Toast from './components/Toast.jsx'
import Tutions from './pages/tutions.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Profile from './components/Profile.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Navbar from './components/Navbar.jsx'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  const hideNavbar = ['/login', '/register', '/admin'].includes(location.pathname);

  return (
    <>
      <Toast />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tutions" element={<Tutions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
