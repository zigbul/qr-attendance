import { useEffect, useState } from 'react';

import './ArchivePage.css';
import { Link } from 'react-router-dom';

const ArchivePage = () => {
  const [archivedLessons, setArchivedLessons] = useState<
    { id: string; name_lesson: string; date: string }[]
  >([]);

  useEffect(() => {
    fetch('/api/archive/getLessons')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched archived lessons:', data.lessons);
        setArchivedLessons(data.lessons);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });
  }, []);

  const onDeleteHandler = (id: string) => {
    console.log(`Lesson ${id} deleted`);
  };

  const onExportHandler = (id: string) => {
    console.log(`Lesson ${id} exported`);
  };

  return (
    <div>
      <h1 className="archive-page__title">Архив</h1>
      <ul className="classes-page__list">
        {archivedLessons.map((lesson) => (
          <li className="classes-page__list-item" key={lesson.id}>
            <div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <h3 className="classes-page__class-title">{lesson.name_lesson}</h3>
                <button
                  className="archive-page__export-button"
                  onClick={() => onExportHandler(lesson.id)}
                />
              </div>
              <p className="classes-page__class-date">{lesson.date}</p>
              <button
                className="archive-page__delete-button"
                onClick={() => onDeleteHandler(lesson.id)}
              />
            </div>
          </li>
        ))}
      </ul>
      <Link className="archive-page__back-link btn btn-primary" to="/classes">
        Назад к урокам
      </Link>
    </div>
  );
};

export default ArchivePage;
