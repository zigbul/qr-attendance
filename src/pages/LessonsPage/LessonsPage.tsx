import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link, useNavigate } from 'react-router-dom';

import './LessonsPage.css';
import type { ILessonInfo, ITeacherInfo } from '../../types';
import useStore from '../../store';

const LessonsPage = () => {
  const [selectedClass, setSelectedClass] = useState<ILessonInfo | null>(null);
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
    <section className="classes-page">
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
              <button
                className="classes-page__button btn btn-primary"
                onClick={() => setSelectedClass(lesson)}>
                Generate QRCode
              </button>
            </li>
          ))}
      </ul>

      {selectedClass && (
        <div className="classes-page__qrcode card">
          <h2 className="classes-page__qrcode-title">QR for {selectedClass.name_lesson}</h2>
          <QRCodeSVG
            value={`${window.location.origin}?token=${selectedClass.qr_token}`}
            size={200}
          />
        </div>
      )}

      <button className="classes-page__logout-button btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
};

export default LessonsPage;
