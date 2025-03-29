export default function ProfileCard({ user }) {
  const renderRoleSpecificContent = () => {
    if (user.role === 'alumni') {
      return React.createElement(
        'div', 
        { className: 'alumni-profile' },
        React.createElement('h3', null, 'Alumni Details'),
        React.createElement('p', null, `Graduation Year: ${user.graduationYear}`)
      );
    }
    if (user.role === 'admin') {
      return React.createElement(
        'div', 
        { className: 'admin-profile' },
        React.createElement('h3', null, 'Admin Dashboard'),
        React.createElement('p', null, 'You have full access to manage the platform.')
      );
    }
    if (user.role === 'vendor') {
      return React.createElement(
        'div', 
        { className: 'vendor-profile' },
        React.createElement('h3', null, 'Vendor Details'),
        React.createElement('p', null, `Company: ${user.company}`),
        React.createElement('p', null, 'Manage your products and services.')
      );
    }
    return React.createElement('p', null, 'Role not recognized.');
  };

  return React.createElement(
    'div', 
    { className: 'profile-section' },
    React.createElement('img', {
      src: user.profilePic,
      alt: 'Profile',
      className: 'profile-pic',
    }),
    React.createElement('h2', null, `Welcome, ${user.name}!`),
    React.createElement('p', null, user.bio),
    renderRoleSpecificContent()
  );
}

