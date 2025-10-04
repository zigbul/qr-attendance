import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginPage.css';

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
      const response = await fetch('https://45.90.216.217/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      console.log(data);
      console.log('cookie: ' + document.cookie);

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
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
