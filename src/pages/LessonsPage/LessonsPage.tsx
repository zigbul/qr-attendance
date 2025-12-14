import { useEffect, useState } from 'react';

import './LessonsPage.css';
import type { ITeacherInfo } from '../../types';
import Sidebar from '../../components/Sidebar';
import LessonCard from '../../components/LessonCard';

const LessonsPage = () => {
  const [teacher, setTeacher] = useState<ITeacherInfo | null>(null);

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
    <section className="page-container">
      <div className="container">
        <h1 className="page-title">Уроки</h1>
        <ul className="page-list">
          {teacher?.lessons &&
            teacher.lessons.map((lesson) => (
              <LessonCard
                id={lesson.id}
                name={lesson.name_lesson}
                type={lesson.type_les}
                date={lesson.date}
                key={lesson.id}
                path={`/lessons/${lesson.id}`}
                text="Перейти к уроку"
                fullname={teacher?.fullName}
              />
            ))}
        </ul>
      </div>
      <Sidebar fullname={teacher?.fullName} />
    </section>
  );
};

export default LessonsPage;
