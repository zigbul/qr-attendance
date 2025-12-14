import { Link, useNavigate } from 'react-router-dom';

import '../LessonCard/LessonCard.css';
import './LessonCardWithArchive.css';
import type { ILessonCardData } from '../../types';

const LessonCard = ({ name, date, type, path, text, fullname, id }: ILessonCardData) => {
  const navigate = useNavigate();

  const onArchiveAddHandler = async () => {
    try {
      const response = await fetch(`/api/archive/add?lessonId=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Archive response:', data);
      alert('Урок добавлен в архив');

      navigate('/lessons');
    } catch (error) {
      console.error('Error archiving lesson:', error);
    }
  };

  return (
    <li className="lesson-card">
      <div>
        <h3 className="lesson-card--title">{name}</h3>
        <p className="lesson-card--date">Дата: {date}</p>
        <p className="lesson-card--type">Тип: {type}</p>
      </div>
      <div className="lesson-card-with-archive--link-wrapper">
        <button className="lesson-card-with-archive--button" onClick={onArchiveAddHandler} />
        <p className="lesson-card--link-subtitle">{text}</p>
        <Link className="lesson-card--link" to={path} state={{ fullname }}>
          →
        </Link>
      </div>
    </li>
  );
};

export default LessonCard;
