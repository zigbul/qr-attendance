import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './LessonsPage.css';
import type { ITeacherInfo } from '../../types';
import useStore from '../../store';

const LessonsPage = () => {
  const [teacher, setTeacher] = useState<ITeacherInfo | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    useStore.getState().setCurrentUser(null);
    navigate('/login');
  };

  useEffect(() => {
    fetch('api/teacher/getInfo', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched teacher data:', data);

        const teacher: ITeacherInfo = {
          fullName: data.fullname,
          lessons: data.lessons,
          role: 'Teacher',
        };

        setTeacher(teacher);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <section className="container">
      <h1 className="classes-page__title">Welcome {teacher?.fullName}</h1>

      <Link className="classes-page__link" to="/lessons/create">
        Create Lesson
      </Link>
      <Link className="classes-page__link" to="/archive">
        Archive
      </Link>

      <ul className="classes-page__list">
        {teacher?.lessons &&
          teacher.lessons.map((lesson) => (
            <li className="classes-page__list-item" key={lesson.id}>
              <div>
                <h3 className="classes-page__class-title">{lesson.name_lesson}</h3>
                <p className="classes-page__class-date">{lesson.date}</p>
              </div>
              <Link to={`/lessons/${lesson.id}`}>Go to Lesson</Link>
            </li>
          ))}
      </ul>

      <button className="classes-page__logout-button btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
};

export default LessonsPage;
