import {lazy, StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {installViewportGestureGuard} from './utils/installViewportGestureGuard';
import './index.css';
import './stages-flaticon.css';

const AdminApp = lazy(() => import('./admin/AdminApp.tsx'));
const AdminDrugEditorPage = lazy(() => import('./admin/AdminDrugEditorPage.tsx'));
const AdminDrugMigrationPage = lazy(() => import('./admin/AdminDrugMigrationPage.tsx'));

installViewportGestureGuard();

const path = window.location.pathname;
const isDrugMigrationRoute = path === '/admin/migrate/drugs' || path.startsWith('/admin/migrate/drugs/');
const isDrugEditorRoute = path === '/admin/drugs' || path.startsWith('/admin/drugs/');
const isAdminRoute = path === '/admin' || path.startsWith('/admin/');

const adminFallback = (
  <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">
    جاري تحميل لوحة الإدارة…
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isDrugMigrationRoute ? (
      <Suspense fallback={adminFallback}>
        <AdminDrugMigrationPage />
      </Suspense>
    ) : isDrugEditorRoute ? (
      <Suspense fallback={adminFallback}>
        <AdminDrugEditorPage />
      </Suspense>
    ) : isAdminRoute ? (
      <Suspense fallback={adminFallback}>
        <AdminApp />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
