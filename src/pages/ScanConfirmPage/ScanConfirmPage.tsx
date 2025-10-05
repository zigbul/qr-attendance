/*import { useNavigate, useSearchParams } from 'react-router-dom';

import './ScanConfirmPage.css';
import useStore from '../../store';

const ScanConfirmPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const classId = params.get('classId');

  const currentUser = useStore((state) => state.currentUser);
  const addAttendance = useStore((state) => state.addAttendance);

  const hasAttended = useStore((state) =>
    state.attendances.some(
      (attendance) => attendance.classId === classId && attendance.studentId === currentUser?.id,
    ),
  );

  if (!cls) {
    return (
      <section className="scan-confirm-page container">
        <div className="scan-confirm-page__error-card">
          <h1 className="scan-page__error-message" style={{ color: 'var(--color-error)' }}>
            Invalid QR code!
          </h1>
        </div>
      </section>
    );
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
    <section className="scan-confirm-page container">
      <div className="scan-confirm-page__card card">
        <h1 className="scan-confirm-page__title">Scan Result</h1>
        <p className="scan-confirm-page__info">
          You are attending:
          <br /> <b>{cls.title}</b>
          <br />
          <span className="scan-confirm-page__info-date">{cls.date}</span>
        </p>
        <div className="scan-confirm-page__buttons-wrapper">
          <button className="btn btn-primary" onClick={handleAttendance}>
            Confirm Attendance
          </button>
          <button className="btn btn-secondary" onClick={handleExit}>
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScanConfirmPage;
*/
