import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

import './LessonPage.css';

interface ILessonData {
  id: string;
  name_lesson: string;
  date: string;
  type_les: string;
  qr_token: string;
}

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<ILessonData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/teacher/getLesson?lessonId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const lessonData: ILessonData = {
          id: data.id,
          name_lesson: data.name_lesson,
          date: data.date,
          type_les: data.type_les,
          qr_token: data.qr_token,
        };

        setLesson(lessonData);
      })
      .catch((error) => {
        console.error('Error fetching lesson data:', error);
      });
  }, []);

  const onArchiveAddHandler = async () => {
    try {
      const response = await fetch(`/api/archive/add?lessonId=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);

      navigate('/classes');
    } catch (error) {
      console.error('Error archiving lesson:', error);
    }
  };

  if (lesson === null) {
    return <div>Такого урока нет</div>;
  }

  return (
    <section className="lesson-page container">
      <div className="lesson-page__card">
        <h3 className="classes-page__class-title">{lesson.name_lesson}</h3>
        <p className="classes-page__class-date">{lesson.date}</p>
        <p className="classes-page__class-type">Тип урока: {lesson.type_les}</p>
        <div>
          <Link className="btn btn-primary lesson-page__back-link" to="/classes">
            Назад к урокам
          </Link>
          <button
            className="btn btn-danger lesson-page__archive-button"
            onClick={onArchiveAddHandler}
          />
        </div>
      </div>

      <div className="">
        <QRCodeSVG value={`${window.location.origin}?token=${lesson.qr_token}`} size={200} />
      </div>
    </section>
  );
};

export default LessonPage;
