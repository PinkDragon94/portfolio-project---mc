import React, { useState } from 'react';
import authService from '../../services/authService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerType, setRegisterType] = useState('alumni'); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send register type along with email and password
      await authService.register({ email, password, type: registerType });
      alert('Registration successful! Please log in.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Dropdown for selecting register type */}
      <label htmlFor="registerType">Register As:</label>
      <select
        id="registerType"
        value={registerType}
        onChange={(e) => setRegisterType(e.target.value)}
      >
        <option value="Alumni">Alumni</option>
        <option value="Partners">Partners</option>
        <option value="Admin">Admin</option>
      </select>

      {/* Input fields for email and password */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
