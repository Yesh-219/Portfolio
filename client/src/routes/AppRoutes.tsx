import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';

// Page Views
import HomePage from '../pages/HomePage';
import ProjectsPage from '../pages/ProjectsPage';
import ExperiencePage from '../pages/ExperiencePage';
import CertificatesPage from '../pages/CertificatesPage';
import ContactPage from '../pages/ContactPage';
import ResumePage from '../pages/ResumePage';
import NotFoundPage from '../pages/NotFoundPage';

import { AdminLayout } from '../components/layout/AdminLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProjects } from '../pages/admin/AdminProjects';
import { AdminExperience } from '../pages/admin/AdminExperience';
import { AdminSkills } from '../pages/admin/AdminSkills';
import { AdminCertificates } from '../pages/admin/AdminCertificates';
import { AdminResume } from '../pages/admin/AdminResume';
import { AdminMessages } from '../pages/admin/AdminMessages';
import { AdminSettings } from '../pages/admin/AdminSettings';
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes (Single Page Application) */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* Admin CMS Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="experience" element={<AdminExperience />} />
        <Route path="skills" element={<AdminSkills />} />
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="resume" element={<AdminResume />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch All */}
      <Route path="404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
