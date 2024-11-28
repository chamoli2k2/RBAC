import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants.js';

const ManageAllPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/owner/get_all_post`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setPosts(response.data.posts);
    } catch (error) {
      alert('Failed to fetch posts');
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/delete_post/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Post deleted');
      fetchAllPosts(); // Refresh list
    } catch (error) {
      alert('Failed to delete post');
    }
  };

  const toggleApproval = async (postId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/owner/toggle_approval/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
        alert('Post approval toggled');
      fetchAllPosts(); // Refresh list
    } catch (error) {
      alert('Failed to toggle post approval');
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-6">Manage All Posts</h2>
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
              <p className="text-gray-400 mb-2">{post.content}</p>
              <p className="text-sm text-gray-300 mb-4">
                Uploaded by: <span className="font-semibold">{post.username}</span> (
                <span className="capitalize">{post.userRole}</span>)
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => toggleApproval(post._id, post.approved)}
                  className={`px-4 py-2 rounded ${
                    post.approved
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {post.isApproved ? 'Unapprove' : 'Approve'}
                </button>
                <button
                  onClick={() => deletePost(post._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAllPosts;
