import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/authService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== 'admin') {
      alert('Access restricted to administrators.');
      navigate('/');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const [usersRes, jobsRes] = await Promise.all([
        fetch('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/jobs')
      ]);
      
      if (usersRes.ok) setUsers(await usersRes.json());
      if (jobsRes.ok) setJobs(await jobsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setUsers(users.filter(u => u._id !== userId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job offer?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setJobs(jobs.filter(j => j._id !== jobId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Admin Board...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Admin Dashboard</h1>
      <p>Manage users and job postings across the platform.</p>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        
        {/* Users Section */}
        <div style={{ flex: '1 1 500px' }}>
          <h2>Platform Users ({users.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {users.map(u => (
              <div key={u._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{u.name}</strong> 
                  <span style={{ marginLeft: '10px', fontSize: '0.8rem', padding: '2px 8px', backgroundColor: '#e9ecef', borderRadius: '12px' }}>{u.role}</span>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#555' }}>{u.email}</p>
                </div>
                {u.role !== 'admin' && (
                  <button 
                    onClick={() => deleteUser(u._id)}
                    style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete User
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Jobs Section */}
        <div style={{ flex: '1 1 500px' }}>
          <h2>Active Jobs ({jobs.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {jobs.map(job => (
              <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{job.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{job.company} • {job.category}</p>
                </div>
                <button 
                  onClick={() => deleteJob(job._id)}
                  style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;