import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants.js';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/owner/get_all_user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data.users);
    } catch (error) {
      alert('Failed to fetch users');
    }
  };

  const promoteUser = async (userId) => {
    try {
      await axios.put(
        `${BASE_URL}/api/owner/promote/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      alert('User promoted to admin');
      fetchUsers(); // Refresh list
    } catch (error) {
      alert('Failed to promote user');
    }
  };

  const demoteUser = async (userId) => {
    try {
      await axios.put(
        `${BASE_URL}/api/owner/demote/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('User demoted to user');
      fetchUsers(); // Refresh list
    } catch (error) {
      alert('Failed to demote user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-6">Manage Users</h2>
      <button
        onClick={() => navigate('/owner-page')} // Navigate back to homepage
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
      >
        Back to Homepage
      </button>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-700">
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3 capitalize">{user.role}</td>
                <td className="px-6 py-3 flex space-x-4">
                  {user.role !== 'Owner' && user.role !== 'Admin' ? (
                    <button
                      onClick={() => promoteUser(user._id)}
                      className={`px-4 py-2 rounded ${
                        user.role === 'Admin'
                          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      Promote
                    </button>
                  ) : null}
                  {user.role !== 'Owner' && user.role !== 'User' ? (
                    <button
                      onClick={() => demoteUser(user._id)}
                      className={`px-4 py-2 rounded ${
                        user.role === 'User'
                          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      Demote
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
