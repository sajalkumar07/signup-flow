import User from './components/user.jsx';
import Auth from './components/auth.jsx';
import React,{useState,useEffect} from 'react';
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://dummyjson.com/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setUser(data);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <div>
      {user ? (
        <User user={user} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;