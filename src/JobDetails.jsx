import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from './services/authService';
import './JobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.role === 'employer') {
          alert('Employers cannot apply for jobs.');
          return;
        }
      }

      // Check if user has CV personal information
      const profile = await authService.getProfile();
      if (!profile.cv || !profile.cv.personalInfo || !profile.cv.personalInfo.fullName || !profile.cv.personalInfo.email) {
        alert('You must provide your personal information in your CV before applying.');
        navigate('/cv');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/jobs/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ coverLetter: 'My default cover letter' })
      });
      
      const data = await response.json();
      if (!response.ok) {
        if (data.message === 'You have already applied to this job') {
           setApplied(true);
        }
        throw new Error(data.message || 'Failed to apply');
      }
      
      alert('Application submitted successfully!');
      setApplied(true);
    } catch(err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="job-details-container"><p>Loading...</p></div>;
  if (error) return <div className="job-details-container"><p>{error}</p></div>;
  if (!job) return null;

  return (
    <div className="job-details-container">
      <div className="job-details-card">
        <h1>{job.title}</h1>
        <h3 className="company-name">{job.company} - {job.location}</h3>
        <div className="job-badges">
          <span className="badge">{job.type}</span>
          <span className="badge">{job.category}</span>
          {job.salary && <span className="badge salary">{job.salary}</span>}
        </div>
        
        <div className="job-description">
          <h4>Job Description</h4>
          <p>{job.description}</p>
        </div>

        {job.requirements && (
          <div className="job-requirements">
            <h4>Requirements</h4>
            <p>{job.requirements}</p>
          </div>
        )}

        <button 
          className={`apply-btn-large ${applied ? 'applied' : ''}`}
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
