import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/authService';

const SeekerDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== 'seeker') {
      alert('Access restricted to job seekers.');
      navigate('/');
      return;
    }
    fetchApplications();
  }, [navigate]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/jobs/user/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setApplications(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return '#d4edda'; // Green
      case 'rejected': return '#f8d7da'; // Red
      case 'reviewed': return '#cce5ff'; // Blue
      default: return '#fff3cd'; // Yellow (pending)
    }
  };

  const getStatusTextColor = (status) => {
    switch(status) {
      case 'accepted': return '#155724';
      case 'rejected': return '#721c24';
      case 'reviewed': return '#004085';
      default: return '#856404';
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading your applications...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
      <h1>My Applications</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Track the status of the jobs you've applied for.</p>

      {applications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3>You haven't applied to any jobs yet.</h3>
          <button 
            onClick={() => navigate('/job-board')}
            style={{ marginTop: '1rem', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Browse Jobs
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {applications.map(app => (
            <div key={app._id} style={{ border: '1px solid #e0e0e0', padding: '1.5rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{app.job?.title || 'Job Deleted'}</h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>
                  <strong>Company:</strong> {app.job?.company || 'N/A'} • <strong>Location:</strong> {app.job?.location || 'N/A'}
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#999' }}>
                  Applied on: {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <div style={{ 
                  padding: '8px 16px', 
                  borderRadius: '20px', 
                  backgroundColor: getStatusColor(app.status), 
                  color: getStatusTextColor(app.status),
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  letterSpacing: '0.5px'
                }}>
                  {app.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeekerDashboard;