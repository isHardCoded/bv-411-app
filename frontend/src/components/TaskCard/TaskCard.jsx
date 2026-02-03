import { useState, useEffect } from 'react';
import { USER_SERVICE } from '../../services/UserService';
import { useNavigate } from 'react-router';
import { Ellipsis } from 'lucide-react';
import { X } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';

import s from './styles.module.css';
import { useAuth } from '../../context/AuthContext';
import { TaskEditForm } from '../TaskEditForm/TaskEditForm';

export const TaskCard = ({ task, deleteTask }) => {
  // const [user, setUser] = useState({});
  // const [assigneesUsers, setAssigneesUsers] = useState([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuth();

  // const { assignees } = task

  // const getUser = async () => {
  //   const id = task.userId;
  //   setUser(await USER_SERVICE.getById(id));
  // };

  // const getAssignees = async () => {
  //   if (!assignees) return;

  //   const usersData = await Promise.all(
  //     assignees.map((assignee) => USER_SERVICE.getById(assignee.userId))
  //   );
  //   setAssigneesUsers(usersData);
  // };

  // useEffect(() => {
  //   getUser();
  //   getAssignees();
  // }, []);

  return (
    <>
      <div
        onClick={() => {
          navigate(`/task/${task.id}`);
        }}
        className={s.card}
      >
        <header className={s.header}>
          <span className={task.completed ? s.done : s.inProgress}>
            {task.completed ? 'Done' : 'In Progress'}
          </span>

          <button
            className={s.tooltipBtn}
            onClick={(e) => {
              e.stopPropagation();
              setIsTooltipOpen(!isTooltipOpen);
            }}
          >
            {isTooltipOpen ? (
              <X color="#848484" />
            ) : (
              <Ellipsis color="#848484" />
            )}
          </button>

          {isTooltipOpen && (
            <div className={s.tooltip}>
              <button
                className={s.editBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditFormOpen(!isEditFormOpen);
                }}
              >
                <Pencil color="#848484" size={20} />
                Edit
              </button>
              <button
                onClick={(e) => {
                  deleteTask(e, task.id, token);
                  setIsTooltipOpen(false);
                }}
                className={s.deleteBtn}
              >
                <Trash2 color="#848484" size={20} />
                Delete
              </button>
            </div>
          )}
        </header>

        <div className={s.content}>
          <h3 className={s.title}>{task.title}</h3>
          <p className={s.description}>{task.description}</p>
        </div>

        <div className={s.details}>
          <div className={s.author}>
            <p>Author</p>
            {/* <img className={s.avatar} src={user.avatar} alt={`${user.firstname} ${user.lastname}`}
                title={`${user.firstname} ${user.lastname}`} /> */}
          </div>

          {/* {assigneesUsers.length > 0 && (
          <div className={s.assignees}>
          <p>Assignees</p>
          <div className={s.avatarsList}>
            {assigneesUsers.map((assigneeUser) => (
              <img
                key={assigneeUser.id}
                className={`${s.avatar} ${s.assignee}`}
                src={assigneeUser.avatar}
                alt={`${assigneeUser.firstname} ${assigneeUser.lastname}`}
                title={`${assigneeUser.firstname} ${assigneeUser.lastname}`}
              />
            ))}
          </div>
        </div>
        )} */}
        </div>
      </div>

      {isEditFormOpen && <TaskEditForm isEditFormOpen={isEditFormOpen} setIsEditFormOpen={setIsEditFormOpen} task={task} />}
    </>
  );
};
