import { useNavigate } from 'react-router-dom';

import './CreateLessonPage.css';

import Sidebar from '../../components/Sidebar';
import Form from '../../components/Form';
import FormTitle from '../../components/FormTitle';
import ErrorMessage from '../../components/ErrorMessage';
import FormBody from '../../components/FormBody';
import FormInput from '../../components/FormInput';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { useState } from 'react';
import useStore from '../../store';
import FormSelect from '../../components/FormSelect';

const CreateLessonPage = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fullname = useStore((state) => state.fullname);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { name, date, type } = Object.fromEntries(formData);

    if (!name || !date || !type) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const lessonRequest = {
      name,
      date,
      type,
    };

    try {
      const response = await fetch('/api/lessons/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(lessonRequest),
      });

      if (response.status == 200) {
        const data = await response.json();

        console.log('Lesson created successfully:', data);

        navigate('/lessons');
      } else {
        throw new Error(`Failed to create lesson. Status code: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error creating lesson:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-container">
      <div className="container">
        <Form>
          <FormTitle>Создать урок</FormTitle>

          <ErrorMessage isError={isError}>Нужно заполнить все поля</ErrorMessage>

          <FormBody handleSubmit={handleSubmit}>
            <FormInput type="text" placeholder="Название урока" name="name" />
            <FormInput type="text" placeholder="Дата" name="date" />
            <FormSelect />
            <SubmitButton loading={loading} />
          </FormBody>
        </Form>
      </div>
      <Sidebar fullname={fullname} />
    </section>
  );
};

export default CreateLessonPage;
