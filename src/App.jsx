import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './Pages/homepage'
import Slider from './Pages/slider';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import StudentDashboard from './Pages/StudentDashboard';
import Explore from './Pages/Explore';
import Attendance from './Pages/Attendance';
import Resources from './Pages/Resources';
import Journal from './Pages/Journal';
import CompanyDashboard from './Pages/CompanyDashboard'
import CompanyAttendance from './Pages/CompanyAttendance'
import CompanyJournal from './Pages/CompanyJournal'
import PM from './Pages/PM'
import CD from './Pages/CD'
import UIUX from './Pages/UIUX';
import SQA from './Pages/SQA';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/StudentDashboard" element={<StudentDashboard/>} />
          <Route path="/Explore" element={<Explore/>} />
          <Route path="/Attendance" element={<Attendance/>} />
          <Route path="/Resources" element={<Resources/>} />
            <Route path="/PM" element={<PM/>} />
            <Route path="/CD" element={<CD/>} />
            <Route path="/UIUX" element={<UIUX/>} />
            <Route path="/SQA" element={<SQA/>} />
          <Route path="/Journal" element={<Journal/>} />
          <Route path="/CompanyDashboard" element={<CompanyDashboard/>} />
          <Route path="/CompanyAttendance" element={<CompanyAttendance/>} />
          <Route path="/CompanyJournal" element={<CompanyJournal/>} />
        </Routes>
     </Router>

    </>
  )
}

export default App
