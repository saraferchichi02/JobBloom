import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/authService';
import './JobBoard.css';

function JobBoard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    fetchJobs();
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on search term and category
  useEffect(() => {
    let filtered = jobs;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((job) => job.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, jobs]);

  const handleApplyJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to apply.');
        return;
      }

      // get user role
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.role === 'employer') {
          alert('Employers cannot apply for jobs. Please log in as a job seeker.');
          return;
        }
      }

      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ coverLetter: 'My cover letter...' })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to apply');
      alert('Application submitted successfully!');
    } catch(err) {
      alert(err.message);
    }
  };

  // Get unique companies
  const companies = [...new Set(jobs.map((job) => job.company))];

  if (loading) {
    return <div className="job-board"><p>Loading jobs...</p></div>;
  }

  return (
    <div className="job-board">
      <div className="jobs-header">
        <div className="header-top">
          <div>
            <h1>Find Your Next Job</h1>
            <p>Browse available job opportunities</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="jobs-stats-section">
        <div className="stat-card">
          <h3>{jobs.length}</h3>
          <p>Job Offers</p>
        </div>
        <div className="stat-card">
          <h3>{companies.length}</h3>
          <p>Companies</p>
        </div>
      </div>

      {/* Companies Section */}
      <div className="jobs-section">
        <h2>Companies Hiring</h2>
        <div className="companies-grid">
          {companies.map((company, index) => {
            const companyJobs = jobs.filter((j) => j.company === company);
            return (
              <div key={index} className="company-card">
                <div className="company-icon">{company.charAt(0).toUpperCase()}</div>
                <h3>{company}</h3>
                <p>{companyJobs.length} open position{companyJobs.length !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Jobs Filters */}
      <div className="jobs-filters">
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Full Stack</option>
          <option value="devops">DevOps</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Jobs List */}
      <div className="jobs-section">
        <h2>Job Offers</h2>
        <div className="jobs-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-header">
                  <h2>{job.title}</h2>
                  <span className="job-category">{job.category}</span>
                </div>

                <p className="job-company">
                  <strong>Company:</strong> {job.company}
                </p>

                <p className="job-location">
                  <strong>Location:</strong> {job.location}
                </p>

                <p className="job-salary">
                  <strong>Salary:</strong> ${job.salary || 'Negotiable'}
                </p>

                <p className="job-description">{job.description}</p>

                <div className="job-details">
                  <span className="job-type">{job.type}</span>
                  <span className="job-posted">
                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <button
                  className="apply-btn"
                  onClick={() => handleApplyJob(job._id)}
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <div className="no-jobs">
              <p>No jobs found. Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </div>

      <div className="jobs-bottom-stats">
        <p>
          Showing <strong>{filteredJobs.length}</strong> of{' '}
          <strong>{jobs.length}</strong> jobs
        </p>
      </div>
    </div>
  );
}

export default JobBoard;
