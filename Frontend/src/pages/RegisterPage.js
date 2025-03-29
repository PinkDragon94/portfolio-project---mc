import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/global.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'alumni' // Default role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      // Automatically log in after registration
      await login(formData.email, formData.password);
      
      navigate(formData.role === 'alumni' ? '/alumni-dashboard' : 
             formData.role === 'vendor' ? '/vendor-dashboard' : '/admin-dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return React.createElement(
    'div',
    { className: 'register-container' },
    [
      React.createElement(
        'h2',
        { key: 'title' },
        'Create an Account'
      ),
      
      error && React.createElement(
        'div',
        { className: 'error-message', key: 'error' },
        error
      ),
      
      React.createElement(
        'form',
        {
          onSubmit: handleSubmit,
          key: 'form',
          className: 'register-form'
        },
        [
          React.createElement(
            'div',
            { className: 'form-group', key: 'name-group' },
            [
              React.createElement(
                'label',
                { htmlFor: 'name', key: 'name-label' },
                'Full Name'
              ),
              React.createElement('input', {
                type: 'text',
                id: 'name',
                name: 'name',
                value: formData.name,
                onChange: handleChange,
                required: true,
                key: 'name-input'
              })
            ]
          ),
          
          React.createElement(
            'div',
            { className: 'form-group', key: 'email-group' },
            [
              React.createElement(
                'label',
                { htmlFor: 'email', key: 'email-label' },
                'Email'
              ),
              React.createElement('input', {
                type: 'email',
                id: 'email',
                name: 'email',
                value: formData.email,
                onChange: handleChange,
                required: true,
                key: 'email-input'
              })
            ]
          ),
          
          React.createElement(
            'div',
            { className: 'form-group', key: 'password-group' },
            [
              React.createElement(
                'label',
                { htmlFor: 'password', key: 'password-label' },
                'Password'
              ),
              React.createElement('input', {
                type: 'password',
                id: 'password',
                name: 'password',
                value: formData.password,
                onChange: handleChange,
                required: true,
                minLength: 6,
                key: 'password-input'
              })
            ]
          ),
          
          React.createElement(
            'div',
            { className: 'form-group', key: 'role-group' },
            [
              React.createElement(
                'label',
                { htmlFor: 'role', key: 'role-label' },
                'Account Type'
              ),
              React.createElement(
                'select',
                {
                  id: 'role',
                  name: 'role',
                  value: formData.role,
                  onChange: handleChange,
                  key: 'role-select'
                },
                [
                  React.createElement(
                    'option',
                    { value: 'alumni', key: 'alumni-option' },
                    'Alumni'
                  ),
                  React.createElement(
                    'option',
                    { value: 'vendor', key: 'vendor-option' },
                    'Vendor/Employer'
                  )
                ]
              )
            ]
          ),
          
          React.createElement(
            'button',
            {
              type: 'submit',
              disabled: loading,
              className: 'submit-btn',
              key: 'submit'
            },
            loading ? 'Creating Account...' : 'Register'
          )
        ]
      ),
      
      React.createElement(
        'p',
        { className: 'login-link', key: 'login-prompt' },
        [
          'Already have an account? ',
          React.createElement(
            'a',
            { href: '/login', key: 'login-link' },
            'Login here'
          )
        ]
      )
    ]
  );
}

export default RegisterPage;