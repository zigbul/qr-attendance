import { useNavigate } from 'react-router-dom';

import useStore from '../../store';
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    useStore.getState().setCurrentUser(null);
    navigate('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Выход
    </button>
  );
};

export default LogoutButton;
