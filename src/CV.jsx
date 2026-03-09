import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CV.css';

const CV = () => {
  const navigate = useNavigate();
  const [cvData, setCVData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      profilePhoto: '',
    },
    summary: '',
    experience: [
      {
        id: 1,
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: '',
      },
    ],
    education: [
      {
        id: 1,
        degree: '',
        institution: '',
        graduationDate: '',
        gpa: '',
      },
    ],
    skills: [
      {
        id: 1,
        skill: '',
        proficiency: 'Intermediate',
      },
    ],
    certifications: [
      {
        id: 1,
        title: '',
        issuer: '',
        dateObtained: '',
      },
    ],
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setCVData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleSummaryChange = (e) => {
    setCVData({
      ...cvData,
      summary: e.target.value,
    });
  };

  const handleExperienceChange = (id, field, value) => {
    const updatedExperience = cvData.experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setCVData({
      ...cvData,
      experience: updatedExperience,
    });
  };

  const handleEducationChange = (id, field, value) => {
    const updatedEducation = cvData.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setCVData({
      ...cvData,
      education: updatedEducation,
    });
  };

  const handleSkillsChange = (id, field, value) => {
    const updatedSkills = cvData.skills.map((skill) =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    setCVData({
      ...cvData,
      skills: updatedSkills,
    });
  };

  const handleCertificationsChange = (id, field, value) => {
    const updatedCertifications = cvData.certifications.map((cert) =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    setCVData({
      ...cvData,
      certifications: updatedCertifications,
    });
  };

  const addExperience = () => {
    const newId = Math.max(...cvData.experience.map((e) => e.id), 0) + 1;
    setCVData({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          id: newId,
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          description: '',
        },
      ],
    });
  };

  const addEducation = () => {
    const newId = Math.max(...cvData.education.map((e) => e.id), 0) + 1;
    setCVData({
      ...cvData,
      education: [
        ...cvData.education,
        {
          id: newId,
          degree: '',
          institution: '',
          graduationDate: '',
          gpa: '',
        },
      ],
    });
  };

  const addSkill = () => {
    const newId = Math.max(...cvData.skills.map((s) => s.id), 0) + 1;
    setCVData({
      ...cvData,
      skills: [
        ...cvData.skills,
        {
          id: newId,
          skill: '',
          proficiency: 'Intermediate',
        },
      ],
    });
  };

  const addCertification = () => {
    const newId = Math.max(...cvData.certifications.map((c) => c.id), 0) + 1;
    setCVData({
      ...cvData,
      certifications: [
        ...cvData.certifications,
        {
          id: newId,
          title: '',
          issuer: '',
          dateObtained: '',
        },
      ],
    });
  };

  const removeExperience = (id) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    });
  };

  const removeEducation = (id) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    });
  };

  const removeSkill = (id) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.filter((skill) => skill.id !== id),
    });
  };

  const removeCertification = (id) => {
    setCVData({
      ...cvData,
      certifications: cvData.certifications.filter((cert) => cert.id !== id),
    });
  };

  const downloadPDF = () => {
    console.log('Downloading CV as PDF:', cvData);
    // Implement PDF download functionality
  };

  return (
    <div className="cv-container">
      <div className="cv-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
          <h1>Create Your CV</h1>
        </div>
        <button className="download-btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>

      {/* Personal Information Section */}
      <section className="cv-section">
        <h2>Personal Information</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={cvData.personalInfo.fullName}
            onChange={handlePersonalInfoChange}
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={cvData.personalInfo.email}
            onChange={handlePersonalInfoChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={cvData.personalInfo.phone}
            onChange={handlePersonalInfoChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={cvData.personalInfo.location}
            onChange={handlePersonalInfoChange}
            placeholder="Enter your city, country"
          />
        </div>
      </section>

      {/* Professional Summary Section */}
      <section className="cv-section">
        <h2>Professional Summary</h2>
        <div className="form-group">
          <label>Summary</label>
          <textarea
            value={cvData.summary}
            onChange={handleSummaryChange}
            placeholder="Write a brief professional summary about yourself"
            rows="4"
          />
        </div>
      </section>

      {/* Experience Section */}
      <section className="cv-section">
        <h2>Work Experience</h2>
        {cvData.experience.map((exp) => (
          <div key={exp.id} className="cv-entry">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) =>
                  handleExperienceChange(exp.id, 'jobTitle', e.target.value)
                }
                placeholder="e.g., Senior Developer"
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(exp.id, 'company', e.target.value)
                }
                placeholder="e.g., Tech Company Inc."
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleExperienceChange(exp.id, 'startDate', e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleExperienceChange(exp.id, 'endDate', e.target.value)
                  }
                  disabled={exp.currentlyWorking}
                />
              </div>
            </div>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                checked={exp.currentlyWorking}
                onChange={(e) =>
                  handleExperienceChange(
                    exp.id,
                    'currentlyWorking',
                    e.target.checked
                  )
                }
              />
              <label>Currently working here</label>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(exp.id, 'description', e.target.value)
                }
                placeholder="Describe your responsibilities and achievements"
                rows="3"
              />
            </div>
            <button
              className="remove-btn"
              onClick={() => removeExperience(exp.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="add-btn" onClick={addExperience}>
          + Add Experience
        </button>
      </section>

      {/* Education Section */}
      <section className="cv-section">
        <h2>Education</h2>
        {cvData.education.map((edu) => (
          <div key={edu.id} className="cv-entry">
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(edu.id, 'degree', e.target.value)
                }
                placeholder="e.g., Bachelor of Science"
              />
            </div>
            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(edu.id, 'institution', e.target.value)
                }
                placeholder="e.g., University Name"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Graduation Date</label>
                <input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) =>
                    handleEducationChange(
                      edu.id,
                      'graduationDate',
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label>GPA (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) =>
                    handleEducationChange(edu.id, 'gpa', e.target.value)
                  }
                  placeholder="e.g., 3.8"
                />
              </div>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeEducation(edu.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="add-btn" onClick={addEducation}>
          + Add Education
        </button>
      </section>

      {/* Skills Section */}
      <section className="cv-section">
        <h2>Skills</h2>
        {cvData.skills.map((skill) => (
          <div key={skill.id} className="cv-entry">
            <div className="form-row">
              <div className="form-group">
                <label>Skill</label>
                <input
                  type="text"
                  value={skill.skill}
                  onChange={(e) =>
                    handleSkillsChange(skill.id, 'skill', e.target.value)
                  }
                  placeholder="e.g., JavaScript, React"
                />
              </div>
              <div className="form-group">
                <label>Proficiency Level</label>
                <select
                  value={skill.proficiency}
                  onChange={(e) =>
                    handleSkillsChange(skill.id, 'proficiency', e.target.value)
                  }
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
            <button className="remove-btn" onClick={() => removeSkill(skill.id)}>
              Remove
            </button>
          </div>
        ))}
        <button className="add-btn" onClick={addSkill}>
          + Add Skill
        </button>
      </section>

      {/* Certifications Section */}
      <section className="cv-section">
        <h2>Certifications</h2>
        {cvData.certifications.map((cert) => (
          <div key={cert.id} className="cv-entry">
            <div className="form-group">
              <label>Certification Title</label>
              <input
                type="text"
                value={cert.title}
                onChange={(e) =>
                  handleCertificationsChange(cert.id, 'title', e.target.value)
                }
                placeholder="e.g., AWS Certified Developer"
              />
            </div>
            <div className="form-group">
              <label>Issuing Organization</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) =>
                  handleCertificationsChange(cert.id, 'issuer', e.target.value)
                }
                placeholder="e.g., Amazon Web Services"
              />
            </div>
            <div className="form-group">
              <label>Date Obtained</label>
              <input
                type="month"
                value={cert.dateObtained}
                onChange={(e) =>
                  handleCertificationsChange(
                    cert.id,
                    'dateObtained',
                    e.target.value
                  )
                }
              />
            </div>
            <button
              className="remove-btn"
              onClick={() => removeCertification(cert.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="add-btn" onClick={addCertification}>
          + Add Certification
        </button>
      </section>
    </div>
  );
};

export default CV;
