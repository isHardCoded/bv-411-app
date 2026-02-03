import { useState, useEffect, use } from 'react';
import { USER_SERVICE } from '../../services/UserService';
import s from './styles.module.css';
import { useAuth } from '../../context/AuthContext';

export const TaskForm = ({ addTask, setIsOpen }) => {
  const { token, user } = useAuth();

  const [data, setData] = useState({
    title: '',
    description: '',
    completed: false,
    userId: user.id,
  });
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const result = await USER_SERVICE.get(token);

    const { data } = result;
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask({
      title: data.title,
      description: data.description,
      completed: data.completed,
      userId: data.userId,
      assignees: [
        {
          userId: '1',
        },
        {
          userId: '2',
        },
      ],
    });
    setIsOpen(false);
  };

  return (
    <div className={s.overlay}>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.field}>
          <label htmlFor="title" className={s.label}>
            Title
          </label>
          <input
            onChange={handleChange}
            className={s.input}
            type="text"
            placeholder="Enter title"
            value={data.title}
            name="title"
            required
          />
        </div>
        <div className={s.field}>
          <label htmlFor="description" className={s.label}>
            Description
          </label>
          <input
            onChange={handleChange}
            className={s.input}
            type="text"
            placeholder="Enter description"
            value={data.description}
            name="description"
            required
          />
        </div>

        {/* TODO: Реализовать выбор пользователя */}
        {/* <select name="" id=""></select> */}

        <div className={s.buttons}>
          <button onClick={() => setIsOpen(false)} className={s.cancel}>
            Cancel
          </button>
          <button type="submit" className={s.add}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
