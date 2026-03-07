
import './App.css'
import {Route,Routes} from "react-router"
import Register from "./pages/register.jsx"
import Login from "./pages/login.jsx"
import Chat from './pages/chat.jsx'
import LandingPage from './pages/landingPage.jsx'
import Toast from './components/Toast.jsx'
import Tutions from './pages/tutions.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
 

  return (
    <>
    <Toast/>
      <Routes>
        
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<LandingPage/>}/>
          <Route path="/tutions" element={<Tutions/>}/>
          <Route path="/chat" element={<Chat/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
