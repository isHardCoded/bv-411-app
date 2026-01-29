import taskService from '../services/task.js';

class TaskController {
  async getAllTasks(req, res, next) {
    try {
      const tasks = await taskService.getAllTasks(req.userId);
      res.json({ data: tasks });
    } catch (e) {
      next(e);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      res.json({ data: task });
    } catch (e) {
      next(e);
    }
  }

  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask({
        ...req.body,
        userId: req.userId,
      });

      res.status(201).json({ data: task });
    } catch (e) {
      next(e);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask({
        id: req.params.id,
        userId: req.userId,
        body: req.body,
      });

      res.json({ data: task });
    } catch (e) {
      next(e);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id);
      res.json({ message: 'Задача удалена' });
    } catch (e) {
      next(e);
    }
  }

  async deleteAllTasks(req, res, next) {
    try {
      await taskService.deleteAllTasks(req.userId);
      res.json({ message: 'Все задачи удалены' });
    } catch (e) {
      next(e);
    }
  }
}

export default new TaskController();
