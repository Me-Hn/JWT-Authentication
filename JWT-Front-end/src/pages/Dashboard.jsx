import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Call a protected backend route
    API.get('/user/profile')
      .then(res => setData(res.data))
      .catch(() => logout()); // token expired? log out
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {data && <p>Welcome, {data.name}!</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}