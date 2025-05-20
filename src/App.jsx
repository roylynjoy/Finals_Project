import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingOverlay from './components/loadingOverlay'; // ✅ Spinner used while lazy loading

// Public
const Homepage = lazy(() => import('./Pages/homepage'));
const Slider = lazy(() => import('./Pages/PageComponents/slider'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const SignIn = lazy(() => import('./Pages/SignIn'));

// Student
const StudentDashboard = lazy(() => import('./Pages/Student/StudentDashboard'));
const Attendance = lazy(() => import('./Pages/Student/Attendance'));
const Resources = lazy(() => import('./Pages/Student/Resources'));
const Journal = lazy(() => import('./Pages/Student/Journal'));
const ViewJournal = lazy(() => import('./Pages/Student/ViewJounal'));
const Explore = lazy(() => import('./Pages/Explore'));
const PM = lazy(() => import('./Pages/Student/PM'));
const CD = lazy(() => import('./Pages/Student/CD'));
const UIUX = lazy(() => import('./Pages/Student/UIUX'));
const SQA = lazy(() => import('./Pages/Student/SQA'));

// Coordinator
const CompanyDashboard = lazy(() => import('./Pages/Coordinator/CompanyDashboard'));
const CompanyAttendance = lazy(() => import('./Pages/Coordinator/CompanyAttendance'));
const CompanyJournal = lazy(() => import('./Pages/Coordinator/CompanyJournal'));

// Admin
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));

// Route Protection
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingOverlay />}>
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
                <ViewJournal />
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

          {/* Shared */}
          <Route path="/PM" element={<PM />} />
          <Route path="/CD" element={<CD />} />
          <Route path="/UIUX" element={<UIUX />} />
          <Route path="/SQA" element={<SQA />} />

          {/* Unauthorized */}
          <Route
            path="/unauthorized"
            element={
              <div className="text-center mt-20 text-2xl text-red-500">
                Unauthorized Access
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
