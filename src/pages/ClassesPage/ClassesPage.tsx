import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { type ClassItem } from '../../types';

const mockClasses: ClassItem[] = [
  { id: '1', title: 'JavaScript - Lecture 1', date: '2025-09-21' },
  { id: '2', title: 'GoLang - Lecture 2', date: '2025-09-22' },
];

const ClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

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
    </section>
  );
};

export default ClassesPage;
