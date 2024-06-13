import React from 'react';

const User = ({ user, onLogout }) => {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default User;
