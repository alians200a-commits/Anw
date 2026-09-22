import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue
} from 'motion/react';

interface DockContextValue {
  mouseX: MotionValue<number>;
  size: number;
  magnification: number;
  distance: number;
  disableMagnification: boolean;
}

const DockContext = createContext<DockContextValue | null>(null);

interface DockProps {
  children: ReactNode;
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  disableMagnification?: boolean;
}

export function Dock({
  children,
  className = '',
  iconSize = 46,
  iconMagnification = 54,
  iconDistance = 96,
  disableMagnification = false
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const resetPointerInfluence = () => mouseX.set(Infinity);
    const viewport = window.visualViewport;

    window.addEventListener('resize', resetPointerInfluence, { passive: true });
    viewport?.addEventListener('resize', resetPointerInfluence, { passive: true });

    return () => {
      window.removeEventListener('resize', resetPointerInfluence);
      viewport?.removeEventListener('resize', resetPointerInfluence);
    };
  }, [mouseX]);

  return (
    <DockContext.Provider
      value={{
        mouseX,
        size: iconSize,
        magnification: iconMagnification,
        distance: iconDistance,
        disableMagnification: disableMagnification || Boolean(reduceMotion)
      }}
    >
      <motion.div
        onPointerMove={(event) => {
          if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
            mouseX.set(event.clientX);
          }
        }}
        onPointerLeave={() => mouseX.set(Infinity)}
        className={className}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

interface DockIconProps {
  children: ReactNode;
  className?: string;
}

export function DockIcon({ children, className = '' }: DockIconProps) {
  const context = useContext(DockContext);
  const ref = useRef<HTMLDivElement>(null);
  const fallbackMouseX = useMotionValue(Infinity);

  const size = context?.size ?? 46;
  const magnification = context?.magnification ?? 54;
  const distance = context?.distance ?? 96;
  const disableMagnification = context?.disableMagnification ?? true;
  const mouseX = context?.mouseX ?? fallbackMouseX;

  const distanceFromPointer = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return value - bounds.left - bounds.width / 2;
  });

  const targetSize = useTransform(
    distanceFromPointer,
    [-distance, 0, distance],
    [size, disableMagnification ? size : magnification, size]
  );

  const springSize = useSpring(targetSize, {
    mass: 0.1,
    stiffness: 150,
    damping: 14
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: springSize, height: springSize }}
      className={'flex shrink-0 items-center justify-center ' + className}
    >
      {children}
    </motion.div>
  );
}
