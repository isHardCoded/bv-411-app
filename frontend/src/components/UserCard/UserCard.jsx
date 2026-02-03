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
      {user.avatar ? (
        <img className={s.avatar} src={`http://localhost:3000${user.avatar}`} />
      ) : (
        <div className={s.defaultAvatar}>
          <div className={s.avatarHead}></div>
          <div className={s.avatarBody}></div>
        </div>
      )}

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
