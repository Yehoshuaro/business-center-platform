import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { PublicLayout } from '@/shared/components/layout/PublicLayout';
import { AdminLayout } from '@/shared/components/layout/AdminLayout';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';

// Public pages
import { HomePage } from '@/pages/public/HomePage';
import { OfficesPage } from '@/pages/public/OfficesPage';
import { OfficeDetailPage } from '@/pages/public/OfficeDetailPage';
import { ConferenceRoomsPage } from '@/pages/public/ConferenceRoomsPage';
import { ConferenceRoomDetailPage } from '@/pages/public/ConferenceRoomDetailPage';
import { TenantsPage } from '@/pages/public/TenantsPage';
import { ContactsPage } from '@/pages/public/ContactsPage';
import { NewsPage } from '@/pages/public/NewsPage';
import { NewsDetailPage } from '@/pages/public/NewsDetailPage';
import { LoginPage } from '@/pages/public/LoginPage';

// Admin pages
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminOfficesPage } from '@/pages/admin/AdminOfficesPage';
import { AdminConferenceRoomsPage } from '@/pages/admin/AdminConferenceRoomsPage';
import { AdminTenantsPage } from '@/pages/admin/AdminTenantsPage';
import { AdminLeadsPage } from '@/pages/admin/AdminLeadsPage';
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';
import { AdminGalleryPage } from '@/pages/admin/AdminGalleryPage';
import { AdminNewsPage } from '@/pages/admin/AdminNewsPage';

export const AppRouter = () => (
  <HashRouter>
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="offices" element={<OfficesPage />} />
        <Route path="offices/:id" element={<OfficeDetailPage />} />
        <Route path="conference-rooms" element={<ConferenceRoomsPage />} />
        <Route path="conference-rooms/:id" element={<ConferenceRoomDetailPage />} />
        <Route path="tenants" element={<TenantsPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:slug" element={<NewsDetailPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>

      {/* Standalone login */}
      <Route path="login" element={<LoginPage />} />

      {/* Admin */}
      <Route element={<ProtectedRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="offices" element={<AdminOfficesPage />} />
          <Route path="conference-rooms" element={<AdminConferenceRoomsPage />} />
          <Route path="tenants" element={<AdminTenantsPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
          <Route path="news" element={<AdminNewsPage />} />
          <Route path="leads" element={<AdminLeadsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </HashRouter>
);
