import { Routes, Route } from 'react-router-dom'
import NavBar from "./components/NavBar.jsx"
import HomePage from "./views/HomePage.jsx"
import LoginPage from "./views/LoginPage.jsx"
import AboutPage from "./views/AboutPage.jsx"
import AppointmentsPage from "./views/AppointmentsPage.jsx"
import ErrorPage from "./views/ErrorPage.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"


function App() {
  
  return (
    <div>
    <NavBar />
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appointments" element={<PrivateRoute><AppointmentsPage /></PrivateRoute>}/>
        <Route path='/about' element={<AboutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
