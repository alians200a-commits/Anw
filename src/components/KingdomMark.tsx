import type { SVGProps } from 'react';

export function KingdomMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 72" fill="none" aria-hidden="true" {...props}>
      <path d="M13 20L9 13L19 16L24 7L32 15L40 7L45 16L55 13L51 20" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 23C17 20 24 19 32 19C40 19 47 20 52 23V40C52 53 44 62 32 68C20 62 12 53 12 40V23Z" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round"/>
      <path d="M27 28H37M32 23V33" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M25 39C28 35 35 34 40 36C36 36 33 38 31 42H25Z" fill="currentColor"/>
      <path d="M30 42H35V47H30V42ZM30.5 48.5H34.5V59H30.5V48.5ZM30 60.5H35V63H30V60.5Z" fill="currentColor"/>
    </svg>
  );
}
