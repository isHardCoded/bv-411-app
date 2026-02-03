import db from '../models/index.js';
import AppError from '../errors/AppError.js';
import { ERROR_CODES } from '../constants/errorCodes.js';

const { Task } = db;

class TaskService {
  async getAllTasks() {
    const tasks = await Task.findAll();

    if (!tasks.length) {
      throw new AppError(ERROR_CODES.TASKS_NOT_FOUND, 404);
    }

    return tasks;
  }

  async getTaskById(id) {
    const task = await Task.findByPk(id);

    if (!task) {
      throw new AppError(ERROR_CODES.TASK_NOT_FOUND, 404);
    }

    return task;
  }

  async createTask({ title, description, userId }) {
    if (!title) {
      throw new AppError(ERROR_CODES.INCORRECT_DATA, 400);
    }

    return Task.create({ title, description, userId });
  }

  async updateTask({ id, userId, body }) {
    const task = await Task.findOne({ where: { id, userId } });

    if (!task) {
      throw new AppError(ERROR_CODES.TASK_NOT_FOUND, 404);
    }

    return await task.update(body);
  }

  async deleteTask(id) {
    const task = await Task.findByPk(id);

    if (!task) {
      throw new AppError(ERROR_CODES.TASK_NOT_FOUND, 404);
    }

    await task.destroy();
  }

  async deleteAllTasks(userId) {
    const count = await Task.destroy({ where: { userId } });

    if (!count) {
      throw new AppError(ERROR_CODES.TASKS_NOT_FOUND, 404);
    }
  }
}

export default new TaskService();
