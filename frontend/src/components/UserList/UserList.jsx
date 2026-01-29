import { UserCard } from '../UserCard/UserCard';
import s from './styles.module.css';

export function UserList({ users }) {
  return (
    <>
      {users.length !== 0 ? (
        <ul className={s.list}>
          {users.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.notFound}>Users not found</p>
      )}
    </>
  );
}
