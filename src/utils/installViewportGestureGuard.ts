let installed = false;

/**
 * Prevent browser/embedded-preview viewport zoom from hijacking the app.
 * Single-finger vertical scrolling remains enabled.
 */
export function installViewportGestureGuard() {
  if (installed || typeof window === 'undefined' || typeof document === 'undefined') return;
  installed = true;

  const lockTouchAction = () => {
    document.documentElement.style.touchAction = 'pan-y';
    document.body.style.touchAction = 'pan-y';
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';

    const root = document.getElementById('root');
    if (root) {
      root.style.touchAction = 'pan-y';
      root.style.minHeight = '100%';
    }
  };

  const preventMultiTouch = (event: TouchEvent) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  };

  const preventGesture = (event: Event) => {
    event.preventDefault();
  };

  const preventBrowserZoomWheel = (event: WheelEvent) => {
    // Trackpads commonly expose pinch-to-zoom as ctrl+wheel.
    if (event.ctrlKey) {
      event.preventDefault();
    }
  };

  lockTouchAction();
  window.addEventListener('load', lockTouchAction, { once: true });

  // Capture phase is intentional: stop the browser/preview zoom before app UI handlers.
  document.addEventListener('touchstart', preventMultiTouch, { passive: false, capture: true });
  document.addEventListener('touchmove', preventMultiTouch, { passive: false, capture: true });

  // Safari/WebKit gesture events are not part of the standard DOM typings,
  // but embedded iOS/WebKit previews can still emit them.
  window.addEventListener('gesturestart', preventGesture, { passive: false, capture: true });
  window.addEventListener('gesturechange', preventGesture, { passive: false, capture: true });
  window.addEventListener('gestureend', preventGesture, { passive: false, capture: true });

  window.addEventListener('wheel', preventBrowserZoomWheel, { passive: false, capture: true });
}
