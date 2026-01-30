import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { USER_SERVICE } from '../../services/UserService';
import s from './styles.module.css';
import { useAuth } from '../../context/AuthContext';

export const ProfilePage = () => {
  const [user, setUser] = useState({});

  const { userId } = useParams();
  const { token } = useAuth();

  const getUser = async () => {
    const result = await USER_SERVICE.getById(userId, token);

    const { data } = result;
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className={s.card}>
        <div className={s.avatarWrapper}>
          <img
            className={s.avatar}
            src={
              user.avatar
                ? `http://localhost:3000${user.avatar}`
                : 'https://www.gravatar.com/avatar/f1e046006b604d6684b212b2ef266d5ede9d86d597cdefc00fa622176bd335f0?default=retro&size=256'
            }
            alt=""
          />
        </div>

        <div>
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
      </div>
    </>
  );
};
