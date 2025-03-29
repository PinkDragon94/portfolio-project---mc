import React, { useState } from 'react';
import '../styles/ResumeCustomizationTool.css';

const ResumeCustomizationTool = ({ resumeContent }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const customizeResume = () => {
    const lowerCaseJobDesc = jobDescription.toLowerCase();
    const matchedSkills = resumeContent.skills.filter(skill => lowerCaseJobDesc.includes(skill.toLowerCase()));
    const matchedProjects = resumeContent.projects.filter(project => lowerCaseJobDesc.includes(project.toLowerCase()));

    const newSuggestions = [
      ...matchedSkills.map(skill => `Emphasize skill: ${skill}`),
      ...matchedProjects.map(project => `Mention project: ${project}`)
    ];

    setSuggestions(newSuggestions);
  };

  return (
    <div className="resume-tool">
      <h2>Resume Customization Tool</h2>
      <textarea
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button onClick={customizeResume}>Get Resume Suggestions</button>

      <div className="suggestions">
        <h3>Suggestions for Tailoring Your Resume:</h3>
        <ul>
          {suggestions.length > 0
            ? suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)
            : <p>No suggestions available.</p>
          }
        </ul>
      </div>
    </div>
  );
};

export default ResumeCustomizationTool;
