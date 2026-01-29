import { NavLink } from 'react-router';
import s from './styles.module.css';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className={s.root}>
      <h2 className={s.logo}>My App</h2>
      <nav>
        <ul className={s.nav}>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? s.active : s.link)}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) => (isActive ? s.active : s.link)}
            >
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profile/${user?.id}`} className={s.link}>
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
