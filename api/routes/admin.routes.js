import { Router } from 'express';
import { showNotApprovedPost, approvePost, deletePost } from '../controllers/admin.controller.js';
import protect from '../middlewares/auth.middleware.js';
import isAdmin_isOwner from '../middlewares/auth.isAdmin.isOwner.middleware.js';

const router = Router();

// Show not approved post
router.get('/get_not_approved_post', protect, isAdmin_isOwner, showNotApprovedPost);

// Approve the post
router.put('/approve_post/:id', protect, isAdmin_isOwner, approvePost);

// Delete the post
router.delete('/delete_post/:id', protect, isAdmin_isOwner, deletePost);

export default router;