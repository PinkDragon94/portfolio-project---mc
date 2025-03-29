import React, { useState } from "react";
import axios from "axios";
import "../styles/global.css";

const CreateProfile = ({ registerType }) => {
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
    formData.append('school', registerType === 'alumni' ? school : '');
    formData.append('company', registerType === 'partners' ? company : '');
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

  return React.createElement(
    'div',
    { className: 'create-profile-container' },
    React.createElement('h2', null, `Create ${registerType === 'alumni' ? 'Alumni' : 'Partner'} Profile`),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement('label', { htmlFor: 'profilePic' }, 'Profile Picture:'),
      React.createElement('input', {
        type: 'file',
        id: 'profilePic',
        accept: 'image/*',
        onChange: (e) => handleFileChange(e, setProfilePic),
        required: true,
      }),
      React.createElement('label', { htmlFor: 'username' }, 'Username:'),
      React.createElement('input', {
        type: 'text',
        id: 'username',
        placeholder: 'Enter your username',
        value: username,
        onChange: (e) => setUsername(e.target.value),
        required: true,
      }),
      registerType === 'alumni' &&
        React.createElement(
          React.Fragment,
          null,
          React.createElement('label', { htmlFor: 'graduationDate' }, 'Graduation Date:'),
          React.createElement('input', {
            type: 'date',
            id: 'graduationDate',
            value: graduationDate,
            onChange: (e) => setGraduationDate(e.target.value),
            required: true,
          }),
          React.createElement('label', { htmlFor: 'school' }, 'School:'),
          React.createElement('input', {
            type: 'text',
            id: 'school',
            placeholder: 'Enter your school',
            value: school,
            onChange: (e) => setSchool(e.target.value),
            required: true,
          }),
          React.createElement('label', { htmlFor: 'resume' }, 'Upload Resume:'),
          React.createElement('input', {
            type: 'file',
            id: 'resume',
            accept: '.pdf,.doc,.docx',
            onChange: (e) => handleFileChange(e, setResume),
            required: true,
          }),
          React.createElement('label', { htmlFor: 'certification' }, 'Upload Certification:'),
          React.createElement('input', {
            type: 'file',
            id: 'certification',
            accept: '.pdf,.jpg,.png',
            onChange: (e) => handleFileChange(e, setCertification),
          })
        ),
      registerType === 'partners' &&
        React.createElement(
          React.Fragment,
          null,
          React.createElement('label', { htmlFor: 'company' }, 'Company:'),
          React.createElement('input', {
            type: 'text',
            id: 'company',
            placeholder: 'Enter your company name',
            value: company,
            onChange: (e) => setCompany(e.target.value),
            required: true,
          })
        ),
      React.createElement('label', { htmlFor: 'bio' }, 'Bio:'),
      React.createElement('textarea', {
        id: 'bio',
        placeholder: 'Tell us about yourself',
        value: bio,
        onChange: (e) => setBio(e.target.value),
      }),
      React.createElement('button', { type: 'submit' }, 'Create Profile')
    )
  );
};

export default CreateProfile;
