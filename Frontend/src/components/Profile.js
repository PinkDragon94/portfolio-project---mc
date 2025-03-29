import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile")
      .then(response => setProfile(response.data))
      .catch(error => console.error("Error fetching profile:", error));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5000/api/profile", profile)
      .then(response => alert("Profile updated successfully"))
      .catch(error => console.error("Error updating profile:", error));
  };

  return React.createElement(
    'div',
    { className: 'profile-container' },
    React.createElement('h2', null, 'My Profile'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement('input', {
        type: 'text',
        name: 'name',
        value: profile.name,
        onChange: handleChange,
        placeholder: 'Name'
      }),
      React.createElement('input', {
        type: 'email',
        name: 'email',
        value: profile.email,
        onChange: handleChange,
        placeholder: 'Email'
      }),
      React.createElement('textarea', {
        name: 'bio',
        value: profile.bio,
        onChange: handleChange,
        placeholder: 'Bio'
      }),
      React.createElement('button', { type: 'submit' }, 'Update Profile')
    )
  );
};

export default Profile;



