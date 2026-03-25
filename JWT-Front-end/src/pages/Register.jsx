import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/api/auth/register', form);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error   && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <input
        type="text" placeholder="username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="text" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        type="text" placeholder="role"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />
      <button type="submit">Register</button>
      <p>Already have an account? <Link to={'/'}>Login</Link></p>
    </form>
  );
}