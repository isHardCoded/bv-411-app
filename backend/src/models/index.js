import sequelize from '../config/database.js';
import Task from './Task.js';
import User from './User.js';

User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

const db = {
  sequelize,
  Task,
  User,
};

export default db;
