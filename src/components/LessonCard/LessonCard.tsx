import { Link } from 'react-router-dom';

import './LessonCard.css';
import type { ILessonCardData } from '../../types';

const LessonCard = ({ name, date, type, path, text, fullname }: ILessonCardData) => {
  return (
    <li className="lesson-card">
      <div>
        <h3 className="lesson-card--title">{name}</h3>
        <p className="lesson-card--date">Дата: {date}</p>
        <p className="lesson-card--type">Тип: {type}</p>
      </div>
      <div className="lesson-card--link-wrapper">
        <p className="lesson-card--link-subtitle">{text}</p>
        <Link className="lesson-card--link" to={path} state={{ fullname }}>
          →
        </Link>
      </div>
    </li>
  );
};

export default LessonCard;
