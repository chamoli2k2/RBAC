import { Router } from 'express';
import { promote, demote, showAllUser, showUser, ownerRegister } from '../controllers/owner.controller.js';
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


export default router;