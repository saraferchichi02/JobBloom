import React, { useState } from 'react';
import './PostJob.css';

function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    category: 'fullstack',
    type: 'Full-time',
    requirements: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      setMessage('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in as an employer to post a job.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to post job');
      }

      const data = await response.json();
      setMessage('Job posted successfully!');
      
      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        salary: '',
        description: '',
        category: 'fullstack',
        type: 'Full-time',
        requirements: '',
      });

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error posting job:', error);
      setMessage('Error posting job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-container">
      <div className="post-job-header">
        <h1>Post a New Job</h1>
        <p>Hire talented professionals by posting your job opportunity</p>
      </div>

      <form onSubmit={handleSubmit} className="post-job-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Senior React Developer"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company Name *</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., TechCorp Inc."
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., New York, NY"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary (Optional)</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., $80,000 - $120,000"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Job Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
              <option value="devops">DevOps</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="type">Employment Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Job Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the job, responsibilities, and what you're looking for..."
            rows="6"
            required
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label htmlFor="requirements">Requirements (Optional)</label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="List the key requirements and qualifications..."
            rows="4"
          ></textarea>
        </div>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Posting Job...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}

export default PostJob;
