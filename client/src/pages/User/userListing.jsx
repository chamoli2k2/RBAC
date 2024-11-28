import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants/constants';
import axios from 'axios';

const UserListing = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/guest/get_all_post`);
      setPosts(response.data.posts);
    } catch (error) {
      alert('Failed to fetch posts');
    }
};

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleAddPost = () => {
    navigate('/add-post');
  }
  
  const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token immediately
        alert('Logged out successfully!'); // Show a success message
        setTimeout(() => {
            navigate('/login'); // Navigate to login after 1 second
        }, 2000); // 1000ms = 1 second
    };

  const handleProfile = () => navigate('/user-profile');


  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-white">USER MODE</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleAddPost}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Add Post
          </button>
          <button
            disabled
            className="bg-gray-600 text-gray-400 px-6 py-2 rounded cursor-not-allowed"
          >
            Manage Posts
          </button>
          <button
            onClick={handleProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
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
              <p className="text-gray-400">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListing;
