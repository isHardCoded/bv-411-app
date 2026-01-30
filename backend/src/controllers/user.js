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
          avatar: user.avatar
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async uploadAvatar(req, res, next) {
    try {
      if (!req.files || !req.files.avatar) {
        return res.status(400).json({
          error: "File not found"
        })
      }

      const user = await userService.uploadUserAvatar(
        req.userId,
        req.files.avatar
      )

      res.json({
        message: "Avatar uploaded",
        data: {
          username: user.username,
          avatar: user.avatar
        }
      })

    } catch (e) {
      next(e)
    }
  }

  async deleteAvatar(req, res, next) {
    try {
      const user = await userService.deleteUserAvatar(req.userId)

      res.json({
        message: "Avatar deleted",
        data: {
          username: user.username,
          avatar: user.avatar
        }
      })
    } catch(e) {
      next(e)
    }
  }
}

export default new UserController();
