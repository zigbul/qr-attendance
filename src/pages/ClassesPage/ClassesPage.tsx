import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link, useNavigate } from 'react-router-dom';

import './ClassesPage.css';
import { type IClassItem } from '../../types';
import useStore from '../../store';

const ClassesPage = () => {
  const mockClasses = useStore((state) => state.mockClasses);
  const [selectedClass, setSelectedClass] = useState<IClassItem | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    useStore.getState().setCurrentUser(null);
    navigate('/login');
  };

  return (
    <section className="classes-page">
      <h1 className="classes-page__title">Welcome to Classes page!</h1>

      <Link className="classes-page__link" to="/reports">
        Go to Reports
      </Link>

      <ul className="classes-page__list">
        {mockClasses.map((cls) => (
          <li className="classes-page__list-item" key={cls.id}>
            <div>
              <h3 className="classes-page__class-title">{cls.title}</h3>
              <p className="classes-page__class-date">{cls.date}</p>
            </div>
            <button
              className="classes-page__button btn btn-primary"
              onClick={() => setSelectedClass(cls)}>
              Generate QRCode
            </button>
          </li>
        ))}
      </ul>

      {selectedClass && (
        <div className="classes-page__qrcode card">
          <h2 className="classes-page__qrcode-title">QR for {selectedClass.title}</h2>
          <QRCodeSVG
            value={`${window.location.origin}/scan?classId=${selectedClass.id}`}
            size={200}
          />
        </div>
      )}

      <button className="classes-page__logout-button btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
};

export default ClassesPage;
