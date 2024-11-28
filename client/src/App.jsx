import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GuestListing from './pages/Guest/guestListing.jsx';
import UserListing from './pages/User/userListing.jsx';
import AdminListing from './pages/Admin/adminListing.jsx';
import OwnerListing from './pages/Owner/ownerListing.jsx';
import CreatePost from './pages/createPost.jsx';
import UserProfile from './pages/User/userProfile.jsx';
import OwnerProfile from './pages/Owner/ownerProfile.jsx';
import AdminProfile from './pages/Admin/adminProfile.jsx';
import ManageUsers from './pages/Owner/manageUsers.jsx';
import ManagePosts from './pages/ManagePost.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path='/guest-page' element={<GuestListing />} />
        <Route path='/user-page' element={<UserListing />} />
        <Route path='/admin-page' element={<AdminListing />} />
        <Route path='/owner-page' element={<OwnerListing />} />
        <Route path='/add-post' element={<CreatePost />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/owner-profile' element={<OwnerProfile />} />
        <Route path='/admin-profile' element={<AdminProfile />} />
        <Route path='/manage-user' element={<ManageUsers />} />
        <Route path='/manage-posts' element={<ManagePosts />} />
      </Routes>
    </Router>
  );
}

export default App;
