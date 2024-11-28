import { Router } from 'express';
import { register, login, update, getPostByUser, getUserProfile, getunApprovedPosts } from '../controllers/user.controller.js';
import { createPost, getApprovedPosts, deletePost, updatePost } from '../controllers/post.controller.js';
import protect from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';


const router = Router();


// Common Routes
router.post('/register_user', register);
// Login a user
router.post('/login', login);
// Update a user
router.put('/update_user/:id', protect, update);
// get post by user
router.get('/get_post_by_user/:id', protect, getPostByUser);
// get profile of user
router.get('/get_profile', protect, getUserProfile);
// get unapproved post by user
router.get('/get_unapproved_post_user', protect, getunApprovedPosts);


router.post('/create_post', protect, upload, createPost);

// Admin and Owner can access these routes
router.get('/get_all_post', protect, getApprovedPosts);
router.put('/update_post/:id', protect, upload, updatePost);
router.delete('/delete_post/:id', protect, deletePost);

export default router;