import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import LessonsPage from './pages/LessonsPage';
import ScanPage from './pages/ScanPage';
//import ReportsPage from './pages/ReportsPage';
import ProtectedRoute from './components/ProtectedRoute';
import CreateLessonPage from './pages/CreateLessonPage';
//import ScanConfirmPage from './pages/ScanConfirmPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/classes"
          element={
            <ProtectedRoute allowedRoles={['Teacher']}>
              <LessonsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <ProtectedRoute allowedRoles={['Student']}>
              <ScanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons/create"
          element={
            <ProtectedRoute allowedRoles={['Teacher']}>
              <CreateLessonPage />
            </ProtectedRoute>
          }
        />
        {/*<Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={['Teacher']}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />*/}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
