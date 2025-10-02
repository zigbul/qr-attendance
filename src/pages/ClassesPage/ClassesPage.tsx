import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link, useNavigate } from 'react-router-dom';

import './ClassesPage.css';
import { type IClassItem } from '../../types';
import useStore from '../../store';
import { LessonApi } from '../../api';

const ClassesPage = () => {
  const classes = useStore((state) => state.classes);
  const [selectedClass, setSelectedClass] = useState<IClassItem | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    useStore.getState().setCurrentUser(null);
    navigate('/login');
  };

  const handleActivateClass = async (classId: number) => {
    try {
      setLoading(true);
      await LessonApi.activate(classId, { expireMinutes: 15 });
      useStore.getState().fetchLessons();
    } catch (error) {
      console.log('Failed to activate class:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQr = async (cls: IClassItem) => {
    try {
      setLoading(true);
      const data = await LessonApi.getQr(cls.id);
      setSelectedClass(cls);
      console.log(data);
    } catch (error) {
      console.log('Failed to generate QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    useStore.getState().fetchLessons();
  }, []);

  return (
    <section className="classes-page">
      <h1 className="classes-page__title">Welcome to Classes page!</h1>

      <Link className="classes-page__link" to="/reports">
        Go to Reports
      </Link>

      {classes.length === 0 ? (
        <p>No classes available. Please create some classes.</p>
      ) : (
        <ul className="classes-page__list">
          {classes.map((cls) => (
            <li className="classes-page__list-item" key={cls.id}>
              <div>
                <h3 className="classes-page__class-title">{cls.title}</h3>
                <p className="classes-page__class-date">{cls.date.split('T').join(' ')}</p>
              </div>

              {cls.isActive === false && (
                <button
                  className="classes-page__button btn btn-primary"
                  onClick={() => handleActivateClass(cls.id)}
                  disabled={loading}>
                  {loading ? 'Activating...' : 'Activate'}
                </button>
              )}

              <button
                className="classes-page__button btn btn-primary"
                onClick={() => setSelectedClass(cls)}
                disabled={loading}>
                Generate QRCode
              </button>
            </li>
          ))}
        </ul>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        selectedClass && (
          <div className="classes-page__qrcode card">
            <h2 className="classes-page__qrcode-title">QR for {selectedClass.title}</h2>
            <img src={qrCode} alt="QR Code" width={200} height={200} />
          </div>
        )
      )}

      <button className="classes-page__logout-button btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
};

export default ClassesPage;
