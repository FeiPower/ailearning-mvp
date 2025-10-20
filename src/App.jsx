import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import CoursePage from './pages/CoursePage';
import AdminDashboard from './pages/AdminDashboard';
import StudentCourses from './pages/student/StudentCourses';
import StudentAnalytics from './pages/student/StudentAnalytics';
import StudentMessages from './pages/student/StudentMessages';
import StudentSettings from './pages/student/StudentSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLicenses from './pages/admin/AdminLicenses';
import AdminSettings from './pages/admin/AdminSettings';
import ToolsPage from './pages/ToolsPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router basename="/139_AI_Fluency_Training/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/analytics" element={<StudentAnalytics />} />
        <Route path="/student/messages" element={<StudentMessages />} />
        <Route path="/student/settings" element={<StudentSettings />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/licenses" element={<AdminLicenses />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

