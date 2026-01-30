import db from '../models/index.js';
import AppError from '../errors/AppError.js';
import { ERROR_CODES } from '../constants/errorCodes.js';
import fileService from './file.js';

const { User } = db;

class UserService {
  async getAllUsers() {
    const users = await User.findAll();

    if (!users.length) {
      throw new AppError(ERROR_CODES.USERS_NOT_FOUND, 404);
    }

    return users;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(ERROR_CODES.USER_NOT_FOUND, 404);
    }

    return user;
  }

  async uploadUserAvatar(id, file) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(ERROR_CODES.USERS_NOT_FOUND, 404);
    }

    if (user.avatar) {
      await fileService.deleteAvatar(file);
    }

    const avatarPath = await fileService.uploadAvatar(file);

    user.avatar = avatarPath;
    await user.save();

    return user;
  }

  async deleteUserAvatar(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(ERROR_CODES.USERS_NOT_FOUND, 404);
    }

    await fileService.deleteAvatar(user.avatar);
    await user.save();

    return user;
  }
}

export default new UserService();
