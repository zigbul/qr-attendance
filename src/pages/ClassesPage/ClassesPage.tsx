import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { type IClassItem } from '../../types';
import useStore from '../../store';
import { Link } from 'react-router-dom';

const ClassesPage = () => {
  const mockClasses = useStore((state) => state.mockClasses);
  const [selectedClass, setSelectedClass] = useState<IClassItem | null>(null);

  return (
    <section>
      <h1>Welcome to Classes page!</h1>

      <ul>
        {mockClasses.map((cls) => (
          <li key={cls.id}>
            {cls.title} ({cls.date}){' '}
            <button onClick={() => setSelectedClass(cls)}>Generate QRCode</button>
          </li>
        ))}
      </ul>

      {selectedClass && (
        <div>
          <h2>QR for {selectedClass.title}</h2>
          <QRCodeSVG
            value={`${window.location.origin}/scan?classId=${selectedClass.id}`}
            size={200}
          />
        </div>
      )}

      <Link to="/reports">Go to Reports</Link>
    </section>
  );
};

export default ClassesPage;
