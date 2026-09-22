import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type AnimatedIconVariant = 'lift' | 'tilt' | 'pop' | 'pulse';

interface AnimatedIconProps {
  children: ReactNode;
  active?: boolean;
  variant?: AnimatedIconVariant;
  className?: string;
}

export function AnimatedIcon({
  children,
  active = false,
  variant = 'pop',
  className = ''
}: AnimatedIconProps) {
  const reduceMotion = useReducedMotion();

  const hover =
    variant === 'lift'
      ? { y: -2, scale: 1.06 }
      : variant === 'tilt'
        ? { rotate: -7, scale: 1.06 }
        : variant === 'pulse'
          ? { scale: 1.08 }
          : { scale: 1.09 };

  const tap =
    variant === 'tilt'
      ? { rotate: 0, scale: 0.94 }
      : { scale: 0.94, y: 0 };

  return (
    <motion.span
      aria-hidden="true"
      className={'inline-grid place-items-center ' + className}
      animate={
        reduceMotion
          ? undefined
          : active
            ? { scale: [1, 1.12, 1], y: [0, -1, 0] }
            : { scale: 1, y: 0, rotate: 0 }
      }
      whileHover={reduceMotion ? undefined : hover}
      whileTap={reduceMotion ? undefined : tap}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 420, damping: 24, mass: 0.42 }
      }
    >
      {children}
    </motion.span>
  );
}
