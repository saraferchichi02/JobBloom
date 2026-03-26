import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from './services/authService'
import './index.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated())
  }, [location])

  const handleCVClick = () => {
    navigate('/cv')
    setMenuOpen(false)
  }

  const handleSignUpClick = () => {
    navigate('/signup')
    setMenuOpen(false)
  }

  const handleLoginClick = () => {
    navigate('/login')
    setMenuOpen(false)
  }

  const handleLogout = () => {
    authService.logout()
    setIsLoggedIn(false)
    navigate('/login')
    setMenuOpen(false)
  }

  return (
    <div className='nav'>
        <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>JobBloom</h1>
        <button className='hamburger' onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
        </button>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <div id='btn-CV'>
            <button onClick={handleCVClick}>create your CV</button>
            <button onClick={handleSignUpClick}>Sign Up</button>
            <button onClick={handleLoginClick}>Login</button>
          </div>
        </div>
    </div>
    
  )
}

export default Navbar