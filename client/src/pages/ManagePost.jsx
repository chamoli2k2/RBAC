import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate(); // Initialize navigate hook

  const fetchUnapprovedPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/get_not_approved_post`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(response.data.posts);
    } catch (error) {
      alert('Failed to fetch unapproved posts');
    }
  };

  const approvePost = async (postId) => {
    try {
      await axios.put(`${BASE_URL}/api/admin/approve_post/${postId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Post approved');
      fetchUnapprovedPosts(); // Refresh list
    } catch (error) {
      alert('Failed to approve post');
    }
  };

  const removePost = async (postId) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/delete_post/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Post removed');
      fetchUnapprovedPosts(); // Refresh list
    } catch (error) {
      alert('Failed to remove post');
    }
  };

  const handleback = () => {
    if(userRole === 'admin'){
      navigate('/admin-page');
    }
    else{
      navigate('/owner-page');
    }
  }

  useEffect(() => {
    fetchUnapprovedPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-6">{userRole} Manage Posts</h2>
      <button
        onClick={handleback} // Navigate to homepage
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
      >
        Back to Homepage
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition transform hover:scale-105"
          >
            <img
              src={post.imageUrl[0]}
              alt={post.title}
              className="h-48 w-full object-cover rounded"
            />
            <div className="mt-4">
              <h3 className="text-2xl font-bold">{post.title}</h3>
              <p className="text-gray-400 mb-4">{post.content}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => approvePost(post._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => removePost(post._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;
