import { TaskCard } from '../TaskCard/TaskCard';
import s from './styles.module.css';

export const TasksList = ({ tasks, deleteTask }) => {

  if (!tasks) {
    return <p className={s.notFound}>Tasks not found</p>;
  }

  return (
    <>
      {tasks.length !== 0 ? (
        <ul className={s.list}>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} deleteTask={deleteTask} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.notFound}>Tasks not found</p>
      )}
    </>
  );
};
