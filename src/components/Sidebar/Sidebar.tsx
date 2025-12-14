import { Link } from 'react-router-dom';

import './Sidebar.css';
import LogoutButton from '../LogoutButton';

const Sidebar = ({ fullname }: { fullname: string | undefined }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-fullname">{fullname}</h2>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/lessons/create">Создать урок</Link>
        </li>
        <li className="sidebar-list-item sidebar-list-item--active">
          <Link to="/lessons">Перейти к урокам</Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/lessons/archive">Архив</Link>
        </li>
      </ul>
      <div className="sidebar-logout">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
