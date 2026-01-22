
import './App.css'
import {Route,Routes} from "react-router"
import Register from "../pages/register.jsx"
import Login from "../pages/login.jsx"
import Chat from '../pages/chat.jsx'
import LandingPage from '../pages/landingPage.jsx'
import Toast from '../components/Toast.jsx'


function App() {
 

  return (
    <>
    <Toast/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </>
  )
}

export default App
