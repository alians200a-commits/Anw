import type { ReactNode } from 'react';

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
  const variantClass =
    variant === 'lift'
      ? 'group-hover:-translate-y-0.5 group-hover:scale-110'
      : variant === 'tilt'
        ? 'group-hover:-rotate-6 group-hover:scale-110'
        : variant === 'pulse'
          ? 'group-hover:scale-110'
          : 'group-hover:scale-110';

  return (
    <span
      aria-hidden="true"
      className={
        'pointer-events-none inline-grid place-items-center transform-gpu transition-transform duration-150 ease-out ' +
        variantClass +
        ' group-active:scale-90 group-active:translate-y-0 ' +
        (active ? 'scale-105 ' : '') +
        className
      }
    >
      {children}
    </span>
  );
}