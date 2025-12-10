import { useEffect, useState } from 'react';
import { useZxing } from 'react-zxing';

import type { IStudentInfo } from '../../types';
import './ScanPage.css';

const ScanPage = () => {
  const [student, setstudent] = useState<IStudentInfo | null>(null);

  const { ref } = useZxing({
    onDecodeResult(result) {
      try {
        const url = new URL(result.getText());
        const token = url.searchParams.get('token');

        if (token) {
          fetch(`api/lessons/mark?token=${token}`, {
            method: 'GET',
            credentials: 'include',
          })
            .then((response) => response.json())
            .then((data) => alert(data));
        } else {
          alert('Invalid QR code!');
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(`Error: ${error.message}`);
        }
      }
    },
  });

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
        console.log('Fetched teacher data:', data);

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
    <section className="scan-page container">
      <h1 className="scan-page__title">Scan QR Code, {student?.fullName}</h1>
      <div className="scan-page__card card">
        <video className="scan-page__scaner" ref={ref} />
        <p className="scan-page__hint">Point your camera at QR code to mark attendance.</p>
      </div>
    </section>
  );
};

export default ScanPage;
