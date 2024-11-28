import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js';


const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
    };
  
    const removeImage = (index) => {
      setImages(image.filter((_, i) => i !== index));
    };

    const onCancel = () => {
        // Redirect to the listing page
        const currRole = localStorage.getItem('role');
        console.log(currRole);

        if(currRole === 'Admin'){
            navigate('/admin-page');
        }
        else if(currRole === 'Owner'){
            navigate('/owner-page');
        }
        else{
            navigate('/user-page');
        }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!title || !content) {
        alert('Title and content are required!');
        return;
      }
  
      // Post creation logic
      setLoading(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      image.forEach((file) => {
        formData.append('image', file);
      });
  
      try {
        // API call to create post
        const response = await axios.post(`${BASE_URL}/api/users/create_post`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        alert('Post created successfully!');
      } catch (error) {
        alert('Failed to create post');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black text-white p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">Create a New Post</h2>
  
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded"
            />
            <textarea
              placeholder="Write your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full p-3 bg-gray-700 rounded"
            ></textarea>
          </div>
  
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Upload Images (optional):</label>
            <input type="file" multiple onChange={handleImageChange} className="block w-full" />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {image.map((image, index) => (
                <div key={index} className="relative bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-32 w-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
  
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="w-8 h-8 border-4 border-t-4 border-gray-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 py-4 rounded text-xl font-semibold"
              >
                Create Post
              </button>
              <button
                onClick={onCancel} // Call onCancel prop
                className="mt-4 w-full bg-red-600 py-3 rounded text-lg"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default CreatePost;
  