import useStore from '../../store';

const ReportsPage = () => {
  const mockClasses = useStore((state) => state.mockClasses);
  const attendances = useStore((state) => state.attendances);
  const mockUsers = useStore((state) => state.mockUsers);

  const students = mockUsers.filter((user) => user.type === 'student');

  return (
    <section>
      <h1>Attendance Reports</h1>

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
