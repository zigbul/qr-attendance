import { useState } from 'react';

import './LoginPage.css';
import type { IUser } from '../../types';
import useStore from '../../store';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const mockUsers: IUser[] = useStore((state) => state.mockUsers);
  const [authError, setAuthError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const credentials = Object.fromEntries(formData);

    const user: IUser | undefined = mockUsers.find(
      (user) => user.login == credentials.login && user.password == credentials.password,
    );

    if (!user) {
      setAuthError(true);
    } else {
      useStore.getState().setCurrentUser(user);

      if (user.type === 'student') {
        navigate('/scan');
      }

      if (user.type === 'teacher') {
        navigate('/classes');
      }
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
            <button className="login-page__form-button btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
