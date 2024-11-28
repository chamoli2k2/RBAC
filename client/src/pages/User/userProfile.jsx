import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants/constants.js';

const UserProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [unapprovedPosts, setUnapprovedPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();   

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/users/get_profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(response.data.user);
    } catch (error) {
      alert('Failed to fetch profile data.');
    }
  };

  const fetchUnapprovedPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/users/get_unapproved_post_user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnapprovedPosts(response.data.post);
    } catch (error) {
      alert('Failed to fetch unapproved posts.');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${BASE_URL}/api/users/update_user/${userData._id}`,
        { ...userData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUnapprovedPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg transition duration-500 hover:shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          User Profile Page
        </h2>

        {/* Profile Information */}
        {editing ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Username:</label>
              <input
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                className="w-full p-3 bg-gray-700 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Email:</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full p-3 bg-gray-700 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Password:</label>
              <input
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full p-3 bg-gray-700 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-green-600 py-3 rounded text-lg font-semibold hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="w-full bg-red-600 py-3 rounded text-lg font-semibold hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-blue-400">Username:</h3>
              <p className="text-gray-300">{userData.username}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-blue-400">Email:</h3>
              <p className="text-gray-300">{userData.email}</p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-blue-600 py-3 rounded text-lg font-semibold hover:bg-blue-700"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate('/user-page')}
              className="w-full bg-green-600 py-3 rounded text-lg font-semibold hover:bg-green-700"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>

      {/* Unapproved Posts */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 mt-6 rounded-lg shadow-lg transition duration-500 hover:shadow-2xl">
        <h3 className="text-3xl font-bold text-center text-yellow-400 mb-4">
          Unapproved Posts
        </h3>
        {unapprovedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {unapprovedPosts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-700 p-4 rounded-lg shadow-lg hover:bg-gray-600 transition transform hover:scale-105"
              >
                <h4 className="text-xl font-bold text-white">{post.title}</h4>
                <p className="text-gray-400">{post.content}</p>
                {post.imageUrl.length > 0 && (
                  <img
                    src={post.imageUrl[0]}
                    alt={post.title}
                    className="mt-4 w-full h-48 object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No unapproved posts found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
