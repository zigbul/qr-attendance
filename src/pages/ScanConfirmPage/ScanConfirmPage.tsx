import { useNavigate, useSearchParams } from 'react-router-dom';
import useStore from '../../store';
import type { IClassItem } from '../../types';

const ScanConfirmPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const classId = params.get('classId');
  const mockClasses = useStore((state) => state.mockClasses);

  const currentUser = useStore((state) => state.currentUser);
  const addAttendance = useStore((state) => state.addAttendance);

  const cls = mockClasses.find((c: IClassItem) => c.id === classId);

  const hasAttended = useStore((state) =>
    state.attendances.some(
      (attendance) => attendance.classId === classId && attendance.studentId === currentUser?.id,
    ),
  );

  if (!cls) {
    return <h1>Invalid QR code!</h1>;
  }

  const handleAttendance = () => {
    if (!currentUser) return;

    if (hasAttended) {
      alert('You already recorded attendance for this class.');
      return;
    }

    addAttendance({
      classId: cls.id,
      studentId: currentUser.id,
      timestamp: new Date().toISOString(),
    });

    alert('Attendance recorded successfully!');
  };

  const handleExit = () => {
    useStore.getState().setCurrentUser(null);
    navigate('/login');
  };

  return (
    <section>
      <h1>Scan Result</h1>
      <p>
        You are attending: <b>{cls.title}</b> ({cls.date})
      </p>
      <button onClick={handleAttendance}>Confirm Attendance</button>
      <button onClick={handleExit}>Выйти</button>
    </section>
  );
};

export default ScanConfirmPage;
