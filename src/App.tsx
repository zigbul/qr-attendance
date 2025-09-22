import { Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import ClassesPage from './pages/ClassesPage';
import ScanPage from './pages/ScanPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </div>
  );
}

export default App;
