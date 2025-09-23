import { useZxing } from 'react-zxing';
import { useNavigate } from 'react-router-dom';

const ScanPage = () => {
  const navigate = useNavigate();

  const { ref } = useZxing({
    onDecodeResult(result) {
      try {
        const url = new URL(result.getText());
        const classId = url.searchParams.get('classId');

        if (classId) {
          navigate(`/scan/confirm?classId=${classId}`);
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

  return (
    <section>
      <h1>Scan QR Code</h1>
      <video ref={ref} style={{ width: '100%', maxWidth: '400px', border: '1px solid #ccc' }} />
      <p>Point your camera at QR code to mark attendance.</p>
    </section>
  );
};

export default ScanPage;
