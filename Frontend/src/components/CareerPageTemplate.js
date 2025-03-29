import React from 'react';
import '../styles/CareerPageTemplate.css';
import ChatBot from '../components/ChatBot';

const CareerPageTemplate = ({ objective, education, skills, communityService, clubs, projects, experience }) => {
  const downloadResume = () => {
    alert("Download resume functionality coming soon!");
  };

  return (
    <div className="career-page">
      <button onClick={downloadResume} className="download-button">Download Resume</button>

      <section className="objective">
        <h2>Objective</h2>
        <p>{objective}</p>
      </section>

      <section className="education">
        <h2>Education</h2>
        <ul>{education.map((edu, index) => <li key={index}>{edu}</li>)}</ul>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <ul>{skills.map((skill, index) => <li key={index}>{skill}</li>)}</ul>
      </section>

      <section className="community-service">
        <h2>Community Service</h2>
        <ul>{communityService.map((service, index) => <li key={index}>{service}</li>)}</ul>
      </section>

      <section className="clubs-orgs">
        <h2>Clubs and Organizations</h2>
        <ul>{clubs.map((club, index) => <li key={index}>{club}</li>)}</ul>
      </section>

      <section className="experience">
        <h2>Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.title} - {exp.company}</h3>
            <p>{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      {projects && (
        <section className="projects">
          <h2>Projects</h2>
          <ul>{projects.map((project, index) => <li key={index}>{project}</li>)}</ul>
        </section>
      )}

      <ChatBot />
    </div>
  );
};

export default CareerPageTemplate;
