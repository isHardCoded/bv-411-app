import { createRoot } from 'react-dom/client';
import './styles/resets.css';

import { BrowserRouter, Route, Routes } from 'react-router';

import { UsersPage } from './pages/UsersPage/UsersPage';
import { MainLayout } from './layouts/MainLayout';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { TasksPage } from './pages/TasksPage/TasksPage';
import { TaskPage } from './pages/TaskPage/TaskPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />

          <Route path="tasks" element={<TasksPage />} />
          <Route path="task/:taskId" element={<TaskPage />} />

          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
