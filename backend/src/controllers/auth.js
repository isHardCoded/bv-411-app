import jwt from 'jsonwebtoken';
import authService from '../services/auth.js';

const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);

      res.status(201).json({
        message: 'Пользователь создан',
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const user = await authService.login(req.body);

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '7d' });

      res.json({ token, user });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
