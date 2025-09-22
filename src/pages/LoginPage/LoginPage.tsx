import { useState } from 'react';

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
    <section>
      <h1>Welcome to login page!</h1>

      {authError && <p style={{ color: 'red' }}>Invalid login or password</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <p>Login</p>
          <input type="text" placeholder="Enter login" name="login" />
        </div>
        <div>
          <p>Password</p>
          <input type="password" placeholder="Enter password" name="password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
