
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './Hero'
import Navbar from './Navbar'
import Footer from './Footer'
import CV from './CV'
import Login from './Login'
import SignUp from './SignUp'
import JOBS from './JOBS'
import PostJob from './PostJob'
import JobBoard from './JobBoard'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <JOBS/>
              <Footer />
            </>
          }
        />
        <Route path="/cv" element={<CV />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job-board" element={<JobBoard />} />
      </Routes>
    </Router>
  )
}

export default App
