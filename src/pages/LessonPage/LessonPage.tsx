import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

import './LessonPage.css';
import Sidebar from '../../components/Sidebar';
import LessonCardWithArchive from '../../components/LessonCardWithArchive';

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
  const { state } = useLocation();

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

  if (lesson === null) {
    return <div>Такого урока нет</div>;
  }

  return (
    <section className="page-container">
      <div className="container">
        <h1 className="page-title">Уроки</h1>
        <LessonCardWithArchive
          name={lesson.name_lesson}
          type={lesson.type_les}
          date={lesson.date}
          key={lesson.id}
          path={`/lessons/${lesson.id}`}
          text={'Открыть урок'}
          fullname={state.fullname}
          id={lesson.id}
        />
        <QRCodeSVG value={`${window.location.origin}?token=${lesson.qr_token}`} size={200} />
      </div>
      <Sidebar fullname={state.fullname} />
    </section>
  );
};

export default LessonPage;
