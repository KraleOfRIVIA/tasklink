import { JSX, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from './stores/authStore';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './components/ProjectPage';
import TasksPage from './pages/TasksPage';
import TimeTrackingPage from './pages/TimeTrackingPage';

import DashboardLayout from './components/ui/layouts/DashboardLayout';

const App = observer(() => {
  const [sessionChecked, setSessionChecked] = useState(false);
  const v = 'react';
  useEffect(() => {
    const init = async () => {
      await authStore.checkSession();
      setSessionChecked(true);
    };
    init();
  }, []);

  if (!sessionChecked || authStore.loading) {
    return <div className="p-4">Загрузка...</div>;
  }

  const ProtectedRoute = (Component: JSX.Element) =>
    authStore.isAuth ? Component : <Navigate to="/login" replace />;

  const AdminRoute = (Component: JSX.Element) =>
    authStore.isAuth && authStore.user?.role === 'admin'
      ? Component
      : <Navigate to="/login" replace />;

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={ProtectedRoute(
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          )}
        />
        <Route
          path="/projects"
          element={ProtectedRoute(
            <DashboardLayout>
              <ProjectsPage />
            </DashboardLayout>
          )}
        />
        <Route
          path="/projects/:id"
          element={ProtectedRoute(
            <DashboardLayout>
              <ProjectPage />
            </DashboardLayout>
          )}
        />
        <Route
          path="/tasks"
          element={ProtectedRoute(
            <DashboardLayout>
              <TasksPage />
            </DashboardLayout>
          )}
        />
        <Route
          path="/time"
          element={ProtectedRoute(
            <DashboardLayout>
              <TimeTrackingPage />
            </DashboardLayout>
          )}
        />
        <Route
          path="/admin"
          element={AdminRoute(
            <DashboardLayout>
              <AdminDashboardPage />
            </DashboardLayout>
          )}
        />

        {/* Default */}
        <Route
          path="*"
          element={
            authStore.isAuth ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
});

export default App;
