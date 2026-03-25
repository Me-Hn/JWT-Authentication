import axios from "axios"

const API = axios.create({
  baseURL: 'http://localhost:7900', // your backend URL
});

// Attach token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;