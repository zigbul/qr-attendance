import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import ClassesPage from './pages/ClassesPage';
import ScanPage from './pages/ScanPage';
import ReportsPage from './pages/ReportsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/classes"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ClassesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <ScanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
