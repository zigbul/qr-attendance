import { Link, useNavigate } from 'react-router-dom';

import '../LessonCard/LessonCard.css';
import './LessonCardWithExport.css';
import type { ILessonCardData } from '../../types';

const LessonCard = ({ name, date, type, path, text, fullname, id }) => {
  const navigate = useNavigate();

  const onDeleteHandler = async (id: string) => {
    try {
      const response = await fetch(`/api/archive/deleteLesson?lessonId=${id}`);
      const data = await response.json();

      alert(data.message);

      setArchivedLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id !== id));
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const onExportHandler = async (id: string) => {
    try {
      console.log(`Lesson ${id} exported`);

      const response = await fetch(`/api/teacher/export?lessonId=${id}`);
      console.log(response);
      const data = await response.blob();

      alert(data);
    } catch (error) {
      console.error('Error exporting lesson:', error);
    }
  };

  return (
    <li className="lesson-card">
      <div>
        <h3 className="lesson-card--title">{name}</h3>
        <p className="lesson-card--date">Дата: {date}</p>
        <p className="lesson-card--type">Тип: {type}</p>
      </div>
      <div className="lesson-card-with-export--button-wrapper">
        <button className="archive-page__export-button" onClick={() => onExportHandler(id)} />
        <button className="archive-page__delete-button" onClick={() => onDeleteHandler(id)} />
      </div>
    </li>
  );
};

export default LessonCard;
