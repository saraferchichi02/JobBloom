import React from 'react'
import './index.css'
function Search() {
  return (
    <div className='search-section'>
  <div className='search-bar-wrapper'>
    <span className="search-icon">🔍</span>
    <input type="text" placeholder="Search internships, companies..." />
    <button className="search-btn">Search Jobs</button>
  </div>
<div className='filter-group'>
       <p className="filter-label">🏢 Industry</p>
    <div className="tags">
      <span className="tag">Technology</span>
      <span className="tag">Finance</span>
      <span className="tag">Healthcare</span>
      <span className="tag">Marketing</span>
      <span className="tag">Design</span>
      <span className="tag">Engineering</span>
    </div>
</div>
<div className='filter-group'>
     <p className="filter-label">📍 Location</p>
    <div className="tags">
      <span className="tag">Remote</span>
      <span className="tag">New York</span>
      <span className="tag active">San Francisco</span> <span className="tag">London</span>
      <span className="tag">Berlin</span>
      <span class="tag">Singapore</span>
    </div>
</div>
    </div>
  )
}

export default Search