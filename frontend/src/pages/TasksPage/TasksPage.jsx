import { useState, useEffect } from 'react';
import { TasksList } from '../../components/TasksList/TasksList';
import { TASK_SERVICE } from '../../services/TaskService';

import s from './styles.module.css';
import { TaskForm } from '../../components/TaskForm/TaskForm';
import { useAuth } from '../../context/AuthContext';

export const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { token } = useAuth();

  const getTasks = async () => {
    const result = await TASK_SERVICE.getAll(token);
    setTasks(result.data);
  };

  const addTask = async (task) => {
    const result = await TASK_SERVICE.create(task, token);

    const { data } = result;
    console.log(`data: ${data}`);
    setTasks([...tasks, data]);
  };

  const deleteTask = async (e, id, token) => {
    e.stopPropagation();
    await TASK_SERVICE.deleteById(id, token);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className={s.root}>
      <div className={s.actions}>
        {/* <input className={s.search} type="text" placeholder="Search..." /> */}
        <button className={s.add} onClick={() => setIsOpen(true)}>
          Add
        </button>
      </div>
      <TasksList tasks={tasks} deleteTask={deleteTask} />
      {isOpen && (
        <TaskForm addTask={addTask} setIsOpen={setIsOpen} setTasks={setTasks} />
      )}
    </div>
  );
};
