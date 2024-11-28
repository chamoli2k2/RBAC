import { Router } from 'express';
import { showAllPost } from '../controllers/guest.controller.js';

const router = Router();

// Getting all post which are approved
router.get('/get_all_post', showAllPost)

export default router;