import express from 'express';
import taskRoutes from './task.js';
import authRoutes from './auth.js';
import userRoutes from './user.js';

const router = express.Router();

router.use('/tasks', taskRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
