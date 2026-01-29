import { useState } from 'react';
import { authService } from '../../services/AuthService';
import s from './styles.module.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    birthDate: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await register(data);

    if (!result.success) {
      setError(result.error);
      return;
    }

    console.log(result);

    navigate('/login');
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <h2 className={s.title}>Create new account</h2>
        <input
          className={s.input}
          onChange={handleChange}
          value={data.username}
          name="username"
          type="text"
          placeholder="Enter username"
          required
        />
        <input
          className={s.input}
          onChange={handleChange}
          value={data.email}
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />
        <input
          className={s.input}
          onChange={handleChange}
          value={data.password}
          name="password"
          type="password"
          placeholder="Enter password"
          required
        />
        <input
          className={s.input}
          onChange={handleChange}
          value={data.birthDate}
          name="birthDate"
          type="date"
          required
        />
        <input
          className={s.input}
          onChange={handleChange}
          value={data.phone}
          name="phone"
          type="number"
          placeholder="Enter phone"
          required
        />

        <button type="submit" className={s.button} disabled={loading}>
          {loading ? 'Wait...' : 'Sign Up'}
        </button>
        <Link to={'/login'} className={s.link}>
          Have an account?
        </Link>

        {error && <p>{error}</p>}
      </form>
    </>
  );
};
