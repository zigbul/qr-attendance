import { useZxing } from 'react-zxing';

import './Scanner.css';

const Scanner = () => {
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
            .then((data) => alert(data.message));
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

  return <video className="scanner" ref={ref} />;
};

export default Scanner;
