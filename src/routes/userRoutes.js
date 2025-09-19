import express from 'express';
import { getMe } from '../controllers/userController.js';
import { authUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/me', authUser, getMe);
export default router;

