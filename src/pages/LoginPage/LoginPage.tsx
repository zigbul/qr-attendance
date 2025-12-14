import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useStore from '../../store';
import type { IUser } from '../../types';

import Form from '../../components/Form';
import FormTitle from '../../components/FormTitle';
import FormInput from '../../components/FormInput';
import FormBody from '../../components/FormBody';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import ErrorMessage from '../../components/ErrorMessage';

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

      if (!response.ok) {
        throw new Error();
      }

      const currentUser: IUser = {
        fullName: data.fullName,
        role: data.role,
      };

      useStore.getState().setCurrentUser(currentUser);

      if (data.role === 'Teacher') {
        navigate('/lessons');
      }

      if (data.role === 'Student') {
        navigate('/scan');
      }
    } catch {
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <Form>
        <FormTitle>Вход</FormTitle>

        <ErrorMessage isError={authError}>Неправильный логин или пароль</ErrorMessage>

        <FormBody handleSubmit={handleSubmit}>
          <FormInput type="text" placeholder="Введите логин" name="login" />
          <FormInput type="password" placeholder="Введите пароль" name="password" />
          <SubmitButton loading={loading} />
        </FormBody>
      </Form>
    </section>
  );
};

export default LoginPage;
