import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import useStore from '../../store';
import type { ReportRow } from '../../types';

const ReportsPage = () => {
  const mockClasses = useStore((state) => state.mockClasses);
  const attendances = useStore((state) => state.attendances);
  const mockUsers = useStore((state) => state.mockUsers);

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
    <section>
      <h1>Attendance Reports</h1>
      <button onClick={exportToExcel}>Export to Excel</button>

      {mockClasses.map((cls) => {
        const classAttendances = attendances.filter((attendance) => attendance.classId === cls.id);

        return (
          <div key={cls.id}>
            <h2>
              {cls.title} ({cls.date})
            </h2>
            {classAttendances.length === 0 ? (
              <p>No attendances recorded.</p>
            ) : (
              <ul>
                {classAttendances.map((attendance) => {
                  const student = students.find((student) => student.id === attendance.studentId);

                  return (
                    <li key={attendance.studentId}>
                      {student?.login} - {new Date(attendance.timestamp).toLocaleString()}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ReportsPage;
