
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import authService from './services/authService'
import Hero from './Hero'
import Navbar from './Navbar'
import Footer from './Footer'
import CV from './CV'
import Login from './Login'
import SignUp from './SignUp'
import JOBS from './JOBS'
import PostJob from './PostJob'
import JobBoard from './JobBoard'
import JobDetails from './JobDetails'
import EmployerDashboard from './EmployerDashboard'
import SeekerDashboard from './SeekerDashboard'
import AdminDashboard from './AdminDashboard'

const HomeRoute = () => {
  if (authService.isAuthenticated()) {
    return <Navigate to="/jobs" replace />;
  }
  return (
    <>
      <Hero />
      <JOBS />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/jobs" element={<><JOBS /><Footer /></>} />
        <Route path="/cv" element={<CV />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job-board" element={<JobBoard />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
