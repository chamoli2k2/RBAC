import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants/constants.js';
import axios from 'axios';

const OwnerListing = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleAddPost = () => navigate('/add-post');
  const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token immediately
        alert('Logged out successfully!'); // Show a success message
        setTimeout(() => {
            navigate('/login'); // Navigate to login after 1 second
        }, 2000); // 1000ms = 1 second
    };

    const handleManageAllPosts = () => {
        navigate('/manage-all-posts');
    };


  const handleProfile = () => navigate('/owner-profile');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleManagePosts = () => {
    navigate('/manage-posts');
    toggleModal();
  };

  const handleManageUsers = () => {
    navigate('/manage-user');
    toggleModal();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-white">OWNER MODE</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleAddPost}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Add Post
          </button>
          <button
            onClick={toggleModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Manage
          </button>
          <button
            onClick={handleProfile}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded"
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

      {/* Posts Grid */}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-6 text-white">Manage Options</h3>
            <div className="space-y-4">
              <button
                onClick={handleManagePosts}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
              >
                Manage Posts
              </button>
              <button
                onClick={handleManageUsers}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full"
              >
                Manage Users
              </button>
              <button
                onClick={handleManageAllPosts}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded w-full"
              >
                View All Posts
              </button>
            </div>
            <button
              onClick={toggleModal}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerListing;
