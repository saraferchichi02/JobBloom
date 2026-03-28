import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/authService';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== 'employer') {
      alert('Access restricted to employers.');
      navigate('/');
      return;
    }
    fetchMyJobs();
  }, [navigate]);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/jobs/user/employer-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job? All applications will be lost.')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setJobs(jobs.filter(job => job._id !== jobId));
        if (selectedJob === jobId) {
          setSelectedJob(null);
          setApplicants([]);
        }
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to delete job');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete job');
    }
  };

  const viewApplicants = async (jobId) => {
    setSelectedJob(jobId);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/applicants`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setApplicants(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (appId, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/jobs/applications/${appId}/status`, {
        method: 'PUT',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setApplicants(applicants.map(app => 
          app._id === appId ? { ...app, status } : app
        ));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Employer Dashboard</h1>
      <p>Manage your jobs and view applicants</p>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h2>Your Posted Jobs</h2>
          {jobs.length === 0 ? <p>You haven't posted any jobs yet.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {jobs.map(job => (
                <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                  <h3>{job.title}</h3>
                  <p>{job.category} • {job.location}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => viewApplicants(job._id)}
                      style={{ padding: '8px 16px', marginTop: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      View Applicants
                    </button>
                    <button 
                      onClick={() => deleteJob(job._id)}
                      style={{ padding: '8px 16px', marginTop: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Delete Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h2>Applicants {selectedJob && `for Selected Job`}</h2>
          {!selectedJob ? <p>Select a job to view applicants.</p> : applicants.length === 0 ? <p>No applicants yet.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {applicants.map(app => (
                <div key={app._id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{app.applicant.name}</h3>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Email:</strong> {app.applicant.email}</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Status:</strong> <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: app.status === 'accepted' ? '#d4edda' : app.status === 'rejected' ? '#f8d7da' : '#e2e3e5' }}>{app.status}</span></p>
                  
                  {app.applicant.cv && app.applicant.cv.experience && app.applicant.cv.experience[0] && (
                    <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555' }}>
                      <strong>Latest Experience:</strong> {app.applicant.cv.experience[0].jobTitle} at {app.applicant.cv.experience[0].company}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button 
                      onClick={() => updateStatus(app._id, 'accepted')}
                      style={{ padding: '6px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => updateStatus(app._id, 'rejected')}
                      style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;