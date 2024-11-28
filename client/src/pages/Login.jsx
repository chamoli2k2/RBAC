import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
      alert('Login successful');
      
      // Save token to local storage for authentication
      localStorage.setItem('token', response.data.token);
      // Save role to local storage for role-based access control
      localStorage.setItem('role', response.data.role);

      const currRole= response.data.role;
      // Redirect to the listing page based on the role
      if(currRole === 'Admin'){
        navigate('/admin-page');
      }
      else if(currRole === 'Owner'){
        navigate('/owner-page');
      }
      else{
        navigate('/user-page');
      }

    } catch (error) {
      alert('Login failed');
    }
  };

  const handleGuestLogin = async () => {
    try {
      alert('Logged in as Guest');
      
      // Save guest token to local storage
      localStorage.setItem('role', 'Guest');

      // Redirect to the listing page
      navigate('/guest-page');
    } catch (error) {
      alert('Guest login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded">Login</button>
        </form>
        <div className="mt-4 text-center space-y-2">
          <button
            onClick={handleGuestLogin}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded"
          >
            Login as Guest
          </button>
          <Link to="/signup" className="text-green-400">Create an Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
