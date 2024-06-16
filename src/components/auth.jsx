import React, { useState } from 'react';
import '../App.css';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://dummyjson.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30,
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        setMessage(`Hello, ${data.username}`);
        onLogin(data);
      } else {
        setMessage('Login failed! Please check your credentials.');
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      setMessage('Login failed! Please try again.');
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className='btn'>Login</button>
        </form>
        <p className="auth-message">{message}</p>
      </div>
    </div>
  );
};

export default Auth;
