import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.data.teacherId) {
        localStorage.setItem('teacherId', response.data.teacherId);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Teacher Login</h2>
  
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
  
        <div className="mb-6">
          <label className="block text-lg text-gray-300 mb-2">Username</label>
          <input
            type="text"
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
  
        <div className="mb-6">
          <label className="block text-lg text-gray-300 mb-2">Password</label>
          <input
            type="password"
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
  
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 rounded-lg hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  );  
};

export default LoginPage;
