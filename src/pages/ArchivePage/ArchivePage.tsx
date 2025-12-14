import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import './ArchivePage.css';
import Sidebar from '../../components/Sidebar';

const ArchivePage = () => {
  const [archivedLessons, setArchivedLessons] = useState<
    { id: string; name_lesson: string; date: string; type_les: string }[]
  >([]);

  const [fullName, setFullName] = useState<string>('');

  useEffect(() => {
    fetch('/api/archive/getLessons')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('Fetched archived lessons:', data.lessons);
        setFullName(data.fullname);
        setArchivedLessons(data.lessons);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });
  }, []);

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
      const response = await fetch(`/api/teacher/export?lessonId=${id}`);
      const { data } = await response.json();

      const rows: { Дата: string; ФИО: string; НомерГруппы: string; Посещение: string }[] = [];

      data.forEach(
        (attendance: {
          confirmedDate: string;
          fullName: string;
          groupId: string;
          status: string;
        }) => {
          rows.push({
            НомерГруппы: attendance.groupId,
            ФИО: attendance.fullName,
            Дата: attendance.confirmedDate,
            Посещение: attendance.status,
          });
        },
      );

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      saveAs(
        new Blob([excelBuffer], { type: 'application/octet-stream' }),
        'attendance_report.xlsx',
      );
    } catch (error) {
      console.error('Error exporting lesson:', error);
    }
  };

  return (
    <section className="page-container">
      <div className="container">
        <h1 className="page-title">Архив</h1>
        <ul className="page-list">
          {archivedLessons.map((lesson) => (
            <li className="lesson-card" key={lesson.id}>
              <div>
                <h3 className="classes-page__class-title">{lesson.name_lesson}</h3>
                <p className="lesson-card--date">Дата: {lesson.date}</p>
                <p className="lesson-card--type">Тип: {lesson.type_les}</p>
                <div className="lesson-card--link-wrapper">
                  <button
                    className="archive-page__export-button"
                    onClick={() => onExportHandler(lesson.id)}
                  />

                  <button
                    className="archive-page__delete-button"
                    onClick={() => onDeleteHandler(lesson.id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Sidebar fullname={fullName} />
    </section>
  );
};

export default ArchivePage;
