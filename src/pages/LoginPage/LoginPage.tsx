import { useState } from 'react';

import './LoginPage.css';
import type { ILoginDto, IUserResponse } from '../../types';
import useStore from '../../store';
import { useNavigate } from 'react-router-dom';
import { AccountApi } from '../../api';

const LoginPage = () => {
  const [authError, setAuthError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const credentials: ILoginDto = {
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    };

    setLoading(true);
    setAuthError(false);

    try {
      const user: IUserResponse = await AccountApi.login(credentials);
      setCurrentUser(user);

      if (user.role === 'Student') {
        navigate('/scan');
      } else if (user.role === 'Teacher') {
        navigate('/classes');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page container">
      <div className="login-page__card card">
        <h1 className="login-page__title">Login</h1>

        {authError && <p className="login-page__error-message">Invalid login or password</p>}

        <form className="login-page__form" onSubmit={handleSubmit}>
          <div>
            <label className="login-page__form-label" htmlFor="login">
              Login
            </label>
            <input
              className="login-page__form-input"
              type="text"
              placeholder="Enter login"
              name="login"
            />
          </div>
          <div>
            <label className="login-page__form-label" htmlFor="password">
              Password
            </label>
            <input
              className="login-page__form-input"
              type="password"
              placeholder="Enter password"
              name="password"
            />
          </div>
          <div>
            <button
              className="login-page__form-button btn btn-primary"
              type="submit"
              disabled={loading}>
              {loading ? 'Loggin in...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
