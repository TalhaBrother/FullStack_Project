
import './App.css'
import {Route,Routes} from "react-router"
import Register from "../pages/register.jsx"
import Login from "../pages/login.jsx"
import LandingPage from '../pages/landingPage.jsx'


function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
