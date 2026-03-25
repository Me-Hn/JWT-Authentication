import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import API from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [succed,setSucced] = useState('')
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (succed) {
    console.log(succed);
  }
}, [succed]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', form);
      login(res.data.token);       // save token
      // navigate('/dashboard');      // redirect
      setSucced('User login Successfully !')
      console.log(succed)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {succed && <p style={{ color: 'green' }}>{succed}</p>}
      <input
        type="text" placeholder="username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}