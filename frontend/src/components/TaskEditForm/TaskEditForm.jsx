import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TASK_SERVICE } from '../../services/TaskService';
import s from './styles.module.css';

export const TaskEditForm = ({ isEditFormOpen, setIsEditFormOpen, task }) => {
  const [data, setData] = useState({
    title: task?.title || '',
    description: task?.description || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const editPost = async () => {
    if (!task?.id || !token) return;

    setIsLoading(true);
    try {
      const result = await TASK_SERVICE.update(
        task.id,
        task.userId,
        data,
        token
      );
      console.log('Updated task:', result);
      setIsEditFormOpen(false);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: оптимистично обновлять список задач после сохранения редактирования
  const handleSubmit = (e) => {
    e.preventDefault();
    editPost();
  };

  const handleCancel = () => {
    setIsEditFormOpen(false);
  };

  if (!isEditFormOpen || !task) return null;

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
        <div className={s.buttons}>
          <button
            type="button"
            onClick={handleCancel}
            className={s.cancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button type="submit" className={s.add} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};
