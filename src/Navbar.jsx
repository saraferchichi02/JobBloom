import React from 'react'
import './index.css'
function Navbar() {
  return (
    <div className='nav'>
        <h1>JobBloom</h1>
        <div>
            <button>jobs</button>
            <button>build CV</button>
        </div>
  <div id='btn-CV'>
            <button>create your CV</button>
        </div>
    </div>
    
  )
}

export default Navbar