import express from 'express'
import { createUser, loginUser, logoutUser, getCurrentUser } from '../controllers/usersController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
const router = express.Router();



router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', isLoggedIn, getCurrentUser);

export default router;