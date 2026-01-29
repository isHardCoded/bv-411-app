import express from 'express';
import taskController from '../controllers/task.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.use(auth);

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.delete('/', taskController.deleteAllTasks);

export default router;
