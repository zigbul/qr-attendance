import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

import './ReportsPage.css';
import type { ReportRow } from '../../types';
import useStore from '../../store';

const ReportsPage = () => {
  const mockClasses = useStore((state) => state.mockClasses);
  const attendances = useStore((state) => state.attendances);
  const mockUsers = useStore((state) => state.mockUsers);

  const navigate = useNavigate();

  const students = mockUsers.filter((user) => user.type === 'student');

  const exportToExcel = () => {
    const rows: ReportRow[] = [];

    mockClasses.forEach((cls) => {
      const classAttendances = attendances.filter((attendance) => attendance.classId === cls.id);

      if (classAttendances.length === 0) {
        rows.push({
          Class: cls.title,
          Date: cls.date,
          Student: '-',
          Timestamp: '-',
        });
      } else {
        classAttendances.forEach((attendance) => {
          const student = students.find((student) => student.id === attendance.studentId);

          rows.push({
            Class: cls.title,
            Date: cls.date,
            Student: student?.login ?? 'Unknown',
            Timestamp: new Date(attendance.timestamp).toLocaleString(),
          });
        });
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'attendance_report.xlsx');
  };

  return (
    <section className="reports-page container">
      <h1 className="reports-page__title">Attendance Reports</h1>

      <button className="reports-page__button btn btn-primary" onClick={exportToExcel}>
        Export to Excel
      </button>

      <div className="reports-page__body">
        {mockClasses.map((cls) => {
          const classAttendances = attendances.filter(
            (attendance) => attendance.classId === cls.id,
          );

          return (
            <div className="reports-page__attendance-card" key={cls.id}>
              <h2 className="reports-page__attendance-card-title">
                {cls.title} <span className="reports-page__attendance-card-date">({cls.date})</span>
              </h2>
              {classAttendances.length === 0 ? (
                <p className="reports-page__attendace-card-empty-text">No attendances recorded.</p>
              ) : (
                <table className="reports-page__attendance-table">
                  <thead>
                    <tr className="reports-page__attendance-table-row">
                      <th className="reports-page__attendance-table-header-cell">Student</th>
                      <th className="reports-page__attendance-table-header-cell">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classAttendances.map((attendance) => {
                      const student = students.find((s) => s.id === attendance.studentId);

                      return (
                        <tr key={attendance.studentId}>
                          <td className="reports-page__attendance-table-body-cell">
                            {student?.login}
                          </td>
                          <td className="reports-page__attendance-table-body-cell">
                            {new Date(attendance.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
        <button
          onClick={() => navigate('/classes')}
          className="reports-page__back-button btn btn-secondary">
          Back to Classes
        </button>
      </div>
    </section>
  );
};

export default ReportsPage;
