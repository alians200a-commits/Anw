import {lazy, StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {installViewportGestureGuard} from './utils/installViewportGestureGuard';
import './index.css';
import './stages-flaticon.css';

const AdminApp = lazy(() => import('./admin/AdminApp.tsx'));

installViewportGestureGuard();

const isAdminRoute = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? (
      <Suspense
        fallback={(
          <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">
            جاري تحميل لوحة الإدارة…
          </div>
        )}
      >
        <AdminApp />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
