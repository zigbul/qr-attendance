import { useEffect, useState } from 'react';

import type { IStudentInfo } from '../../types';

import LogoutButton from '../../components/LogoutButton';
import Scanner from '../../components/Scanner';

const ScanPage = () => {
  const [student, setstudent] = useState<IStudentInfo | null>(null);

  useEffect(() => {
    fetch('api/student/getInfo', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const student: IStudentInfo = {
          fullName: data.fullname,
          role: 'Student',
          groupId: data.groupId,
        };

        setstudent(student);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <section className="container">
      <h2>{student?.fullName}</h2>
      <div className="form">
        <h1 className="form-title">Сканировать QR</h1>
        <Scanner />
        <p>Окно для сканирования QR кода</p>
      </div>
      <LogoutButton />
    </section>
  );
};

export default ScanPage;
