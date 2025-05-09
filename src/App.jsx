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
import AdminDashboard from './Pages/AdminDashboard';
import ViewJournal from './Pages/ViewJounal';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />

        {/* Student Routes */}
        <Route
          path="/StudentDashboard"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Attendance"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Resources"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <Resources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Journal"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <Journal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ViewJournal"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <ViewJournal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Explore"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <Explore />
            </ProtectedRoute>
          }
        />

        {/* Coordinator Routes */}
        <Route
          path="/CompanyDashboard"
          element={
            <ProtectedRoute allowedRoles={["Coordinator"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CompanyAttendance"
          element={
            <ProtectedRoute allowedRoles={["Coordinator"]}>
              <CompanyAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CompanyJournal"
          element={
            <ProtectedRoute allowedRoles={["Coordinator"]}>
              <CompanyJournal />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared Routes (all users) */}
        <Route path="/PM" element={<PM />} />
        <Route path="/CD" element={<CD />} />
        <Route path="/UIUX" element={<UIUX />} />
        <Route path="/SQA" element={<SQA />} />

        {/* Unauthorized fallback */}
        <Route path="/unauthorized" element={<div className="text-center mt-20 text-2xl text-red-500">Unauthorized Access</div>} />
      </Routes>
    </Router>
  );
}

export default App;
