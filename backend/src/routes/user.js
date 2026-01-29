import express from 'express';
import userController from '../controllers/user.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.use(auth);

router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);

export default router;
