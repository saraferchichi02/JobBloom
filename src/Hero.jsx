import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

function Hero() {
  const navigate = useNavigate()

  const handlePostJob = () => {
    navigate('/post-job')
  }

  return (
    <div className="hero-section">
        <p>✨ Your dream internship awaits</p>
        <h1>Launch Your Career with <br />Amazing Internships</h1>
        <h5>Connect with top companies, build your professional CV, and take <br /> the first step towards an incredible career journey.</h5>
    <div className='hero-btn'>
    <button onClick={handlePostJob}>Post Job</button>
    </div>
    <div className='stats-container'>
         <div className="stat-item">
    <h2>5,000+</h2>
    <p>Active Internships</p>
  </div>

  <div className="stat-item">
    <h2>500+</h2>
    <p>Partner Companies</p>
  </div>

  <div className="stat-item">
    <h2>10,000+</h2>
    <p>Happy Interns</p>
  </div>
    </div>
    </div>
  )
}

export default Hero