import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LoginPage from './pages/LoginPage';
import LessonsPage from './pages/LessonsPage';
import ScanPage from './pages/ScanPage';
//import ReportsPage from './pages/ReportsPage';
import ProtectedRoute from './components/ProtectedRoute';
import useStore from './store';
import type { IUser } from './types';
//import ScanConfirmPage from './pages/ScanConfirmPage';

function App() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth-check', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok === false || response.status === 404) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      const currentUser: IUser = {
        fullName: data.fullname,
        role: data.role,
      };

      useStore.getState().setCurrentUser(currentUser);

      if (currentUser.role === 'Teacher') {
        navigate('/classes');
      } else {
        navigate('/scan');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      navigate('/login');
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return <div>Loading...</div>;
  }

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
        {/*<Route
          path="/scan/confirm"
          element={
            <ProtectedRoute allowedRoles={['Student']}>
              <ScanConfirmPage />
            </ProtectedRoute>
          }
        />*/}
        {/*<Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={['Teacher']}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
