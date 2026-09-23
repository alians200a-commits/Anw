import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {installViewportGestureGuard} from './utils/installViewportGestureGuard';
import './index.css';
import './stages-flaticon.css';

installViewportGestureGuard();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
