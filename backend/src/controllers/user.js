import userService from '../services/user.js';

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers(req.userId);
      res.json({ data: users });
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json({
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
