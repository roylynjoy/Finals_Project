import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './Pages/homepage'
import Slider from './Pages/slider';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';

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
        </Routes>
     </Router>

    </>
  )
}

export default App
