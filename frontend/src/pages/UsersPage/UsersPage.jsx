import { useState, useEffect } from 'react';
import { UserList } from '../../components/UserList/UserList';
import { USER_SERVICE } from '../../services/UserService';
import { useAuth } from '../../context/AuthContext';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const { token } = useAuth();

  const getUsers = async () => {
    const result = await USER_SERVICE.get(token);

    const { data } = result;
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <UserList users={users} />
    </>
  );
};
