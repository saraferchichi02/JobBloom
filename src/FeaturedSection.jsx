import React from "react";
import "./index.css";
const FeaturedSection = () => {
  const internships = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$25-35/hr",
      type: "Full-time",
      icon: "🚀",
      skills: ["React", "TypeScript", "Node.js"]
    },
    {
      id: 2,
      title: "Product Design Intern",
      company: "DesignStudio",
      location: "Remote",
      salary: "$22-30/hr",
      type: "Full-time",
      icon: "🎨",
      skills: ["Figma", "UI/UX", "Prototyping"]
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "DataFlow Inc",
      location: "New York, NY",
      salary: "$28-40/hr",
      type: "Part-time",
      icon: "📊",
      skills: ["Python", "ML", "SQL"]
    }
  ];

  return (
    <section className="featured-section">
      <div className="section-header">
        <h2>Featured Internships</h2>
        <p>Hand-picked opportunities from top companies</p>
      </div>

      <div className="internship-grid">
        {internships.map((job) => (
          <div className="internship-card" key={job.id}>
            <div className="card-top">
              <div className="icon-container">{job.icon}</div>
              <span className="job-type-badge">{job.type}</span>
            </div>

            <h3 className="job-title">{job.title}</h3>
            <p className="company-info">🏢 {job.company}</p>

            <div className="job-meta">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
            </div>

            <div className="skill-tags">
              {job.skills.map((skill, index) => (
                <span key={index} className="tag">{skill}</span>
              ))}
            </div>

            <button className="view-details-btn">
              View Details <span className="arrow">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
