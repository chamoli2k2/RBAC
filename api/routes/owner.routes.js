import { Router } from 'express';
import { promote, demote, showAllUser, showUser, ownerRegister, deletePost, allPost, toggleApproval } from '../controllers/owner.controller.js';
import protect from '../middlewares/auth.middleware.js';
import isOwner from '../middlewares/auth.owner.middleware.js';

const router = Router();

// Register owner
router.post('/register_owner', ownerRegister);

// Promote a user
router.put('/promote/:id', protect, isOwner, promote);

// Demote a user
router.put('/demote/:id', protect, isOwner, demote);

// Show all users
router.get('/get_all_user', protect, isOwner, showAllUser);

// Show a user
router.get('/get_user/:id', protect, isOwner, showUser);

// delete post
router.delete('/delete_post/:id', protect, isOwner, deletePost);

// Get all the post
router.get('/get_all_post', protect, isOwner, allPost);

// Toggle the approval of a post
router.put('/toggle_approval/:id', protect, isOwner, toggleApproval);


export default router;