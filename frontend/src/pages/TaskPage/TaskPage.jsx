import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { TASK_SERVICE } from '../../services/TaskService';
import { USER_SERVICE } from '../../services/UserService';

import s from './styles.module.css';

export const TaskPage = () => {
  const [task, setTask] = useState({});
  const [user, setUser] = useState({});

  const { taskId } = useParams();
  const { userId } = task;

  const getTask = async () => {
    setTask(await TASK_SERVICE.getById(taskId));
  };

  const getUser = async () => {
    setUser(await USER_SERVICE.getById(userId));
  };

  useEffect(() => {
    getTask();
  }, []);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  return (
    <div className={s.card}>
      <header className={s.header}>
        <span className={task.completed ? s.done : s.inProgress}>
          {task.completed ? 'Done' : 'In Progress'}
        </span>
        <button className={s.tooltipBtn}>
          <img src="icons/more.svg" alt="" />
        </button>
      </header>

      <div className={s.content}>
        <h3 className={s.title}>{task.title}</h3>
        <p className={s.description}>{task.description}</p>
      </div>

      <div className={s.details}>
        <p>Author</p>
        <img className={s.avatar} src={user.avatar} alt="" />
      </div>
    </div>
  );
};
