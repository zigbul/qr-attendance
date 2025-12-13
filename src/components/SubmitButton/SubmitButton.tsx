import './SubmitButton.css';

const SubmitButton = ({ loading }: { loading: boolean }) => {
  return (
    <button className="submit-button" type="submit" disabled={loading}>
      →
    </button>
  );
};

export default SubmitButton;
