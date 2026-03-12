import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/authService';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ role: '', company: '' });
  const [certifications, setCertifications] = useState([]);
  const [newCert, setNewCert] = useState({ name: '', link: '', image: null });
  const avatarInputRef = useRef(null);
  const certImageRef = useRef(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setNewName(currentUser.name);

    // Load saved profile data from localStorage
    const savedProfile = localStorage.getItem('profile_' + currentUser.id);
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setAvatar(profile.avatar || null);
      setBio(profile.bio || '');
      setExperiences(profile.experiences || []);
      setCertifications(profile.certifications || []);
    }
  }, [navigate]);

  const saveProfile = (updates) => {
    if (!user) return;
    const current = JSON.parse(localStorage.getItem('profile_' + user.id) || '{}');
    const updated = { ...current, ...updates };
    localStorage.setItem('profile_' + user.id, JSON.stringify(updated));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      saveProfile({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveName = () => {
    if (!newName.trim()) return;
    const updatedUser = { ...user, name: newName.trim() };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditingName(false);
    saveProfile({ name: newName.trim() });
  };

  const handleSaveBio = () => {
    saveProfile({ bio });
  };

  const handleAddExperience = () => {
    if (!newExperience.role.trim() || !newExperience.company.trim()) return;
    const updated = [...experiences, { ...newExperience, id: Date.now() }];
    setExperiences(updated);
    setNewExperience({ role: '', company: '' });
    saveProfile({ experiences: updated });
  };

  const handleRemoveExperience = (id) => {
    const updated = experiences.filter((exp) => exp.id !== id);
    setExperiences(updated);
    saveProfile({ experiences: updated });
  };

  const handleAddCertification = () => {
    if (!newCert.name.trim()) return;
    const updated = [...certifications, { ...newCert, id: Date.now() }];
    setCertifications(updated);
    setNewCert({ name: '', link: '', image: null });
    saveProfile({ certifications: updated });
  };

  const handleCertImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCert((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCertification = (id) => {
    const updated = certifications.filter((c) => c.id !== id);
    setCertifications(updated);
    saveProfile({ certifications: updated });
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) {
    return <div className="profile-page"><p>Loading...</p></div>;
  }

  return (
    <div className="profile-page">
      {/* Avatar & Name */}
      <div className="profile-header">
        <div className="profile-avatar" onClick={() => avatarInputRef.current?.click()}>
          {avatar ? (
            <img src={avatar} alt="Avatar" />
          ) : (
            <span>{user.name.charAt(0).toUpperCase()}</span>
          )}
          <div className="avatar-overlay">Change</div>
          <input
            type="file"
            ref={avatarInputRef}
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />
        </div>

        <div className="profile-name-section">
          {editingName ? (
            <div className="edit-name-row">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="edit-name-input"
              />
              <button onClick={handleSaveName} className="save-btn">Save</button>
              <button onClick={() => { setEditingName(false); setNewName(user.name); }} className="cancel-btn">Cancel</button>
            </div>
          ) : (
            <div className="edit-name-row">
              <h1>{user.name}</h1>
              <button onClick={() => setEditingName(true)} className="edit-btn">Edit</button>
            </div>
          )}
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="profile-section">
        <h2>Bio</h2>
        <textarea
          className="bio-textarea"
          placeholder="Write something about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button onClick={handleSaveBio} className="save-btn">Save Bio</button>
      </div>

      {/* Experience */}
      <div className="profile-section">
        <h2>Work Experience</h2>
        <div className="experience-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div>
                <h3>{exp.role}</h3>
                <p>{exp.company}</p>
              </div>
              <button onClick={() => handleRemoveExperience(exp.id)} className="remove-btn">Remove</button>
            </div>
          ))}
        </div>
        <div className="add-experience-form">
          <input
            type="text"
            placeholder="Role / Position"
            value={newExperience.role}
            onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
          />
          <input
            type="text"
            placeholder="Company Name"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
          />
          <button onClick={handleAddExperience} className="add-btn">+ Add Experience</button>
        </div>
      </div>

      {/* Certifications */}
      <div className="profile-section">
        <h2>Certifications</h2>
        <div className="certifications-list">
          {certifications.map((cert) => (
            <div key={cert.id} className="certification-item">
              <div className="cert-content">
                <h3>{cert.name}</h3>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">View Certificate</a>
                )}
                {cert.image && (
                  <img src={cert.image} alt={cert.name} className="cert-image" />
                )}
              </div>
              <button onClick={() => handleRemoveCertification(cert.id)} className="remove-btn">Remove</button>
            </div>
          ))}
        </div>
        <div className="add-cert-form">
          <input
            type="text"
            placeholder="Certification Name"
            value={newCert.name}
            onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
          />
          <input
            type="url"
            placeholder="Link (optional)"
            value={newCert.link}
            onChange={(e) => setNewCert({ ...newCert, link: e.target.value })}
          />
          <div className="cert-upload-row">
            <button type="button" onClick={() => certImageRef.current?.click()} className="upload-btn">
              {newCert.image ? 'Image Selected' : 'Upload Image'}
            </button>
            <input
              type="file"
              ref={certImageRef}
              accept="image/*"
              onChange={handleCertImageChange}
              hidden
            />
          </div>
          <button onClick={handleAddCertification} className="add-btn">+ Add Certification</button>
        </div>
      </div>

      {/* Logout */}
      <div className="profile-logout">
        <button onClick={handleLogout} className="logout-btn-profile">Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
