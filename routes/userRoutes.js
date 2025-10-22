import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {
	 login,
	 createUser,
	 getUsers,
	 getUserById,
	 updateUser,
	 deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// Public route
router.post('/login', login);
router.post('/users', createUser);
// Protected routes
router.get('/users', auth, getUsers);
router.get('/users/:id', auth, getUserById);
router.put('/users/:id', auth, updateUser);
router.delete('/users/:id', auth, deleteUser);

export default router;
