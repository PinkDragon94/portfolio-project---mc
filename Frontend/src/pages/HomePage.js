import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/global.css';

function HomePage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  // Create feature card element
  function createFeatureCard(title, items, key) {
    return React.createElement(
      'div',
      { 
        className: 'feature-card',
        key: key,
        style: {
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          margin: '1rem 0',
          flex: '1',
          minWidth: '300px'
        }
      },
      [
        React.createElement('h3', null, title),
        React.createElement(
          'ul',
          null,
          items.map((item, i) => 
            React.createElement('li', { key: i }, item)
          )
        )
      ]
    );
  }

  // Main content elements
  const elements = [
    React.createElement(
      'h1',
      { 
        key: 'title',
        style: {
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }
      },
      'Welcome to Our Community Platform'
    ),
    React.createElement(
      'section',
      { 
        className: 'hero-section',
        key: 'hero',
        style: {
          marginBottom: '2rem',
          textAlign: 'center'
        }
      },
      [
        React.createElement(
          'p',
          {
            style: {
              fontSize: '1.2rem',
              marginBottom: '1rem'
            }
          },
          'Connecting alumni with opportunities and each other'
        ),
        !isAuthenticated && React.createElement(
          'div',
          { 
            className: 'auth-buttons',
            style: {
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center'
            }
          },
          [
            React.createElement(
              Link,
              {
                to: '/login',
                key: 'login',
                style: {
                  padding: '0.5rem 1rem',
                  background: '#007bff',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none'
                }
              },
              'Login'
            ),
            React.createElement(
              Link,
              {
                to: '/register',
                key: 'register',
                style: {
                  padding: '0.5rem 1rem',
                  background: '#6c757d',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none'
                }
              },
              'Register'
            )
          ]
        )
      ]
    ),
    React.createElement(
      'section',
      { 
        className: 'features',
        key: 'features',
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center'
        }
      },
      [
        createFeatureCard(
          'For Alumni',
          [
            'Browse job opportunities',
            'Connect with other alumni',
            'Attend exclusive events'
          ],
          'alumni-features'
        ),
        createFeatureCard(
          'For Employers',
          [
            'Post job openings',
            'Find qualified candidates',
            'Engage with our community'
          ],
          'employer-features'
        )
      ]
    )
  ];

  // Add user greeting if authenticated
  if (isAuthenticated) {
    elements.push(
      React.createElement(
        'div',
        { 
          className: 'user-greeting',
          key: 'greeting',
          style: {
            marginTop: '2rem',
            textAlign: 'center'
          }
        },
        [
          React.createElement(
            'p',
            {
              style: {
                fontSize: '1.2rem',
                marginBottom: '1rem'
              }
            },
            `Welcome back, ${user.name}!`
          ),
          React.createElement(
            Link,
            {
              to: user.role === 'alumni' 
                ? '/alumni-dashboard' 
                : user.role === 'vendor' 
                  ? '/vendor-dashboard' 
                  : '/admin-dashboard',
              style: {
                padding: '0.5rem 1rem',
                background: '#28a745',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none'
              }
            },
            'Go to your dashboard'
          )
        ]
      )
    );
  }

  return React.createElement(
    'div',
    { 
      className: 'home-container',
      style: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }
    },
    elements
  );
}

export default HomePage;