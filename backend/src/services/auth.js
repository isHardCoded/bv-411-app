import db from '../models/index.js';
import bcrypt from 'bcrypt';
import AppError from '../errors/AppError.js';
import { ERROR_CODES } from '../constants/errorCodes.js';

const { User } = db;
const SALT_ROUNDS = 10;

class AuthService {
  async register({ username, email, password, birthDate, phone }) {
    if (!username || !email || !password) {
      throw new AppError(ERROR_CODES.INCORRECT_DATA, 400);
    }

    const exists = await User.findOne({ where: { username } });

    if (exists) {
      throw new AppError(ERROR_CODES.USER_ALREADY_EXISTS, 409);
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return User.create({ username, email, password: hash, birthDate, phone });
  }

  async login({ username, password }) {
    if (!username || !password) {
      throw new AppError(ERROR_CODES.INCORRECT_DATA, 400);
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new AppError(ERROR_CODES.USER_NOT_FOUND, 401);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AppError(ERROR_CODES.USER_NOT_FOUND, 401);
    }

    return user;
  }
}

export default new AuthService();
