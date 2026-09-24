import {lazy, StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {AppErrorBoundary} from './components/AppErrorBoundary';
import {installViewportGestureGuard} from './utils/installViewportGestureGuard';
import './index.css';
import './readability.css';
import './premiumGuide.css';
import './inhalationalIcon.css';
import './stages-flaticon.css';
import './admin/adminMobile.css';

const AdminApp = lazy(() => import('./admin/AdminAppV4.tsx'));
const AdminDrugEditorPage = lazy(() => import('./admin/AdminDrugEditorPage.tsx'));
const AdminDrugHub = lazy(() => import('./admin/AdminDrugHub.tsx'));
const AdminEquipmentEditorPage = lazy(() => import('./admin/AdminEquipmentEditorPage.tsx'));
const AdminEquipmentHub = lazy(() => import('./admin/AdminEquipmentHub.tsx'));
const AdminFluidEditorPage = lazy(() => import('./admin/AdminFluidEditorPage.tsx'));
const AdminFluidHub = lazy(() => import('./admin/AdminFluidHub.tsx'));
const AdminDrugMigrationPage = lazy(() => import('./admin/AdminDrugMigrationPage.tsx'));
const AdminReviewPage = lazy(() => import('./admin/AdminReviewPageV2.tsx'));
const AdminAuditPage = lazy(() => import('./admin/AdminAuditPage.tsx'));

installViewportGestureGuard();

const path = window.location.pathname;
const isDrugMigrationRoute = path === '/admin/migrate/drugs' || path.startsWith('/admin/migrate/drugs/');
const isAuditRoute = path === '/admin/audit' || path.startsWith('/admin/audit/');
const isReviewRoute = path === '/admin/review' || path.startsWith('/admin/review/');
const isFluidHubRoute = path === '/admin/fluids/manage' || path.startsWith('/admin/fluids/manage/');
const isFluidEditorRoute = path === '/admin/fluids' || path.startsWith('/admin/fluids/');
const isEquipmentHubRoute = path === '/admin/equipment/manage' || path.startsWith('/admin/equipment/manage/');
const isEquipmentEditorRoute = path === '/admin/equipment' || path.startsWith('/admin/equipment/');
const isDrugHubRoute = path === '/admin/drugs/manage' || path.startsWith('/admin/drugs/manage/');
const isDrugEditorRoute = path === '/admin/drugs' || path.startsWith('/admin/drugs/');
const isAdminRoute = path === '/admin' || path.startsWith('/admin/');

if (isAdminRoute) {
  document.documentElement.dataset.adminRoute = 'true';
} else {
  delete document.documentElement.dataset.adminRoute;
}

const adminFallback = (
  <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">
    جاري تحميل لوحة الإدارة…
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
    {isAuditRoute ? (
      <Suspense fallback={adminFallback}><AdminAuditPage /></Suspense>
    ) : isDrugMigrationRoute ? (
      <Suspense fallback={adminFallback}><AdminDrugMigrationPage /></Suspense>
    ) : isReviewRoute ? (
      <Suspense fallback={adminFallback}><AdminReviewPage /></Suspense>
    ) : isFluidHubRoute ? (
      <Suspense fallback={adminFallback}><AdminFluidHub /></Suspense>
    ) : isFluidEditorRoute ? (
      <Suspense fallback={adminFallback}><AdminFluidEditorPage /></Suspense>
    ) : isEquipmentHubRoute ? (
      <Suspense fallback={adminFallback}><AdminEquipmentHub /></Suspense>
    ) : isEquipmentEditorRoute ? (
      <Suspense fallback={adminFallback}><AdminEquipmentEditorPage /></Suspense>
    ) : isDrugHubRoute ? (
      <Suspense fallback={adminFallback}><AdminDrugHub /></Suspense>
    ) : isDrugEditorRoute ? (
      <Suspense fallback={adminFallback}><AdminDrugEditorPage /></Suspense>
    ) : isAdminRoute ? (
      <Suspense fallback={adminFallback}><AdminApp /></Suspense>
    ) : (
      <App />
    )}
    </AppErrorBoundary>
  </StrictMode>,
);