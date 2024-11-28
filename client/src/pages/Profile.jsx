import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants.js';

const Profile = () => {
  const [cars, setCars] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all cars for the logged-in user
  const fetchUserCars = async () => {
    
    const token = localStorage.getItem('token');
 
    try {
      const response = await axios.get(`${BASE_URL}/api/car/get_all_car_user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching user cars:', error);
    }
  };

  // Handle car deletion
  const deleteCar = async (id) => {
    const token = localStorage.getItem('token');
    setDeleteLoading(true);
    try {
      await axios.delete(`${BASE_URL}/api/car/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Car deleted successfully');
      fetchUserCars(); // Refresh the list
    } catch (error) {
      alert('Failed to delete car');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle edit button click
  const handleEditClick = (car) => {
    setCurrentCar(car);
    setIsEditing(true);
  };

  // Handle car update
  const handleUpdateCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${BASE_URL}/api/car/update/${currentCar._id}`,
        currentCar,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Car updated successfully');
      setIsEditing(false);
      fetchUserCars(); // Refresh the list
    } catch (error) {
      alert('Failed to update car');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCurrentCar({ ...currentCar, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchUserCars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Back to Listing Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Your Cars</h2>
        <button
          onClick={() => navigate('/listing')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Back to Listing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car._id} className="bg-gray-800 p-6 rounded shadow relative">
            {car.imageUrls.length > 0 && (
              <img
                src={car.imageUrls[0]}
                alt={car.title}
                className="h-48 w-full object-cover rounded"
              />
            )}
            <h3 className="text-2xl font-bold mt-4">{car.title}</h3>
            <p className="text-gray-400">Year: {car.year}</p>
            <p className="text-gray-400">Type: {car.type}</p>
            <p className="text-green-500 font-bold">₹ {car.price}</p>

            {/* Update and Delete Buttons with spacing */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => handleEditClick(car)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded mr-4"
              >
                Update
              </button>
              <button
                onClick={() => deleteCar(car._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded shadow-lg w-1/3">
            <h3 className="text-2xl font-bold mb-4">Update Car</h3>
            <form onSubmit={handleUpdateCar} className="space-y-4">
              <input
                type="text"
                name="title"
                value={currentCar.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-3 bg-gray-700 rounded"
              />
              <textarea
                name="description"
                value={currentCar.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 bg-gray-700 rounded"
              ></textarea>
              <input
                type="number"
                name="year"
                value={currentCar.year}
                onChange={handleChange}
                placeholder="Year"
                className="w-full p-3 bg-gray-700 rounded"
              />
              <input
                type="number"
                name="price"
                value={currentCar.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-3 bg-gray-700 rounded"
              />
              <button
                type="submit"
                className="w-full bg-green-600 py-3 rounded mt-4"
              >
                {loading ? 'Updating...' : 'Update Car'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-4 w-full bg-red-600 py-3 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
