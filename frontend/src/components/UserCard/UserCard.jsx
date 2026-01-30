import s from './styles.module.css';
import { useNavigate } from 'react-router';

export function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/profile/${user.id}`);
      }}
      className={s.card}
    >
      <img
        className={s.avatar}
        src={
          user.avatar
            ? `http://localhost:3000${user.avatar}`
            : 'https://www.gravatar.com/avatar/f1e046006b604d6684b212b2ef266d5ede9d86d597cdefc00fa622176bd335f0?default=retro&size=256'
        }
        alt=""
      />

      <div className={s.content}>
        <p className={s.name}>{user.username}</p>
        <p className={s.email}>{user.email}</p>
      </div>

      <div className={s.actions}>
        <div>
          <p className={s.birth}>{user.birthDate}</p>
          <p className={s.phone}>{user.phone}</p>
        </div>
      </div>
    </div>
  );
}
