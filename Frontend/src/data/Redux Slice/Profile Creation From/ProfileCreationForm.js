import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the type parameter
import './CreateProfile.css';

const CreateProfile = () => {
  const { type } = useParams(); // Get the type from the route parameter
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [graduationDate, setGraduationDate] = useState('');
  const [school, setSchool] = useState('');
  const [company, setCompany] = useState('');
  const [resume, setResume] = useState(null);
  const [certification, setCertification] = useState(null);
  const [bio, setBio] = useState('');

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('profilePic', profilePic);
    formData.append('graduationDate', graduationDate);
    formData.append('school', type === 'alumni' ? school : '');
    formData.append('company', type === 'partners' ? company : '');
    formData.append('resume', resume);
    formData.append('certification', certification);
    formData.append('bio', bio);

    try {
      // Replace with your API call to save the profile
      console.log('Profile submitted:', {
        username,
        graduationDate,
        school,
        company,
        bio,
        profilePic,
        resume,
        certification,
      });
      alert('Profile created successfully!');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  return (
    <div className="create-profile-container">
      <h2>Create {type === 'alumni' ? 'Alumni' : 'Partner'} Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="profilePic">Profile Picture:</label>
        <input
          type="file"
          id="profilePic"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setProfilePic)}
          required
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {type === 'alumni' && (
          <>
            <label htmlFor="graduationDate">Graduation Date:</label>
            <input
              type="date"
              id="graduationDate"
              value={graduationDate}
              onChange={(e) => setGraduationDate(e.target.value)}
              required
            />

            <label htmlFor="school">School:</label>
            <input
              type="text"
              id="school"
              placeholder="Enter your school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
            />

            <label htmlFor="resume">Upload Resume:</label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e, setResume)}
              required
            />

            <label htmlFor="certification">Upload Certification:</label>
            <input
              type="file"
              id="certification"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange(e, setCertification)}
            />
          </>
        )}

        {type === 'partners' && (
          <><label htmlFor="company">Company:</label><input
                      type="text"
                      id="company"
                      placeholder="Enter your company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required /></>
        )}

        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          placeholder="Tell us about yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>

        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
