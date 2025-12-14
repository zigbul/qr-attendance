import { Link } from 'react-router-dom';

import './LessonCard.css';

const LessonCard = ({
  name,
  date,
  type,
  id,
}: {
  name: string;
  date: string;
  type: string;
  id: string;
}) => {
  return (
    <li className="lesson-card">
      <div>
        <h3 className="lesson-card--title">{name}</h3>
        <p className="lesson-card--date">Дата: {date}</p>
        <p className="lesson-card--type">Тип: {type}</p>
      </div>
      <div className="lesson-card--link-wrapper">
        <p className="lesson-card--link-subtitle">Открыть урок</p>
        <Link className="lesson-card--link" to={`/lessons/${id}`}>
          →
        </Link>
      </div>
    </li>
  );
};

export default LessonCard;
