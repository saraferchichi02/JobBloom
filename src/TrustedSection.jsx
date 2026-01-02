import React from 'react'
import './index.css'
const TrustedSection = () => {
  const companies = [
    { id: 1, name: "Google", openings: 45, icon: "🔍" },
    { id: 2, name: "Microsoft", openings: 38, icon: "💻" },
    { id: 3, name: "Apple", openings: 32, icon: "🍎" },
    { id: 4, name: "Amazon", openings: 56, icon: "📦" },
    { id: 5, name: "Meta", openings: 28, icon: "👥" },
    { id: 6, name: "Netflix", openings: 15, icon: "🎬" },
    { id: 7, name: "Spotify", openings: 22, icon: "🎵" },
    { id: 8, name: "Airbnb", openings: 19, icon: "🏠" },
  ];

  return (
    <section className="trusted-section">
      <div className="trusted-header">
        <h2>Trusted by Leading Companies</h2>
        <p>Join thousands of interns who have launched their careers at world-class organizations</p>
      </div>

      <div className="company-grid">
        {companies.map((company) => (
          <div key={company.id} className="company-card">
            <div className="company-icon">{company.icon}</div>
            <h4 className="company-title">{company.name}</h4>
            <p className="opening-count">{company.openings} openings</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedSection