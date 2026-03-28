import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/authService';
import './JOBS.css';

function JOBS() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showPostJobForm, setShowPostJobForm] = useState(false);
  const [postJobFormData, setPostJobFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    category: 'fullstack',
    type: 'Full-time',
    requirements: '',
  });
  const [postJobMessage, setPostJobMessage] = useState('');

  // Fetch jobs from backend
  useEffect(() => {
    fetchJobs();
  }, []);

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

  const handleDetailsClick = (jobId) => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    } else {
      navigate(`/job/${jobId}`);
    }
  };

  const handlePostJobInputChange = (e) => {
    const { name, value } = e.target;
    setPostJobFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostJobSubmit = async (e) => {
    e.preventDefault();

    if (!postJobFormData.title || !postJobFormData.company || !postJobFormData.location || !postJobFormData.description) {
      setPostJobMessage('Please fill in all required fields');
      return;
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setPostJobMessage('You must be logged in to post a job');
        return;
      }

      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postJobFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post job');
      }

      setPostJobMessage('Job posted successfully!');
      setPostJobFormData({
        title: '',
        company: '',
        location: '',
        salary: '',
        description: '',
        category: 'fullstack',
        type: 'Full-time',
        requirements: '',
      });

      // Refresh jobs list
      fetchJobs();
      setTimeout(() => {
        setShowPostJobForm(false);
        setPostJobMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error posting job:', error);
      setPostJobMessage(error.message || 'Error posting job. Please try again.');
    }
  };

  if (loading) {
    return <div className="jobs-container"><p>Loading jobs...</p></div>;
  }

  const currentUser = authService.getCurrentUser();
  const showPostJobButton = !currentUser || currentUser.role === 'employer';

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <div className="header-top">
          <div>
            <h1>Find Your Next Job</h1>
            <p>Browse available job opportunities</p>
          </div>
          {showPostJobButton && (
            <button 
              className="post-job-btn-header" 
              onClick={() => {
                if (!currentUser) {
                  navigate('/login');
                } else {
                  navigate('/post-job');
                }
              }}
            >
              + Post a Job
            </button>
          )}
        </div>

        {showPostJobForm && (
          <div className="post-job-form-container">
            <form onSubmit={handlePostJobSubmit} className="post-job-form">
              <div className="form-row">
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title *"
                  value={postJobFormData.title}
                  onChange={handlePostJobInputChange}
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name *"
                  value={postJobFormData.company}
                  onChange={handlePostJobInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  name="location"
                  placeholder="Location *"
                  value={postJobFormData.location}
                  onChange={handlePostJobInputChange}
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  name="salary"
                  placeholder="Salary (Optional)"
                  value={postJobFormData.salary}
                  onChange={handlePostJobInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <select
                  name="category"
                  value={postJobFormData.category}
                  onChange={handlePostJobInputChange}
                  className="form-input"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Full Stack</option>
                  <option value="devops">DevOps</option>
                  <option value="other">Other</option>
                </select>
                <select
                  name="type"
                  value={postJobFormData.type}
                  onChange={handlePostJobInputChange}
                  className="form-input"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Job Description *"
                value={postJobFormData.description}
                onChange={handlePostJobInputChange}
                required
                className="form-textarea"
              ></textarea>

              <textarea
                name="requirements"
                placeholder="Requirements (Optional)"
                value={postJobFormData.requirements}
                onChange={handlePostJobInputChange}
                className="form-textarea"
              ></textarea>

              {postJobMessage && (
                <div className={`form-message ${postJobMessage.includes('Error') ? 'error' : 'success'}`}>
                  {postJobMessage}
                </div>
              )}

              <button type="submit" className="form-submit-btn">Post Job</button>
            </form>
          </div>
        )}
      </div>

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
                onClick={() => handleDetailsClick(job._id)}
              >
                More details
              </button>
            </div>
          ))
        ) : (
          <div className="no-jobs">
            <p>No jobs found. Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      <div className="jobs-stats">
        <p>
          Showing <strong>{filteredJobs.length}</strong> of{' '}
          <strong>{jobs.length}</strong> jobs
        </p>
      </div>
    </div>
  );
}

export default JOBS;
