import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useStore from '../../store';

import './LoginPage.css';
import type { IUser } from '../../types';

const LoginPage = () => {
  const [authError, setAuthError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const credentials = Object.fromEntries(formData);

    const { login, password } = credentials as { login: string; password: string };

    try {
      const response = await fetch('api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      console.log(data);
      console.log('cookie: ' + JSON.stringify(document.cookie));

      const currentUser: IUser = {
        fullName: data.fullName,
        role: data.role,
      };

      useStore.getState().setCurrentUser(currentUser);

      if (data.role === 'Teacher') {
        navigate('/classes');
      }

      if (data.role === 'Student') {
        navigate('/scan');
      }
    } catch (e) {
      console.error('Error during authentication:', e);
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page container">
      <div className="login-page__card card">
        <h1 className="login-page__title">Вход</h1>

        {authError && <p className="login-page__error-message">Неправильный логин или </p>}

        <form className="login-page__form" onSubmit={handleSubmit}>
          <div>
            <input
              className="login-page__form-input"
              type="text"
              placeholder="Введите логин"
              name="login"
            />
          </div>
          <div>
            <input
              className="login-page__form-input"
              type="password"
              placeholder="Введите пароль"
              name="password"
            />
          </div>
          <button
            className="login-page__form-button btn btn-primary"
            type="submit"
            disabled={loading}>
            →
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
