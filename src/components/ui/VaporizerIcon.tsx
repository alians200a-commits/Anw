export function VaporizerIcon({
  size = 26,
  play = false,
  className = ''
}: {
  size?: number;
  play?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 72"
      width={size}
      height={size}
      className={'pointer-events-none shrink-0 overflow-visible ' + className}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect
          x="15"
          y="10"
          width="42"
          height="52"
          rx="8"
          fill="#F8FBFD"
          stroke="#173A63"
          strokeWidth="3"
        />
        <path d="M21 43h30v13H21z" fill="#D9E6F2" stroke="#2F69A8" strokeWidth="2.4" />
        <path d="M23 49c5-3 9 3 14 0s9 3 12 0" stroke="#2F69A8" strokeWidth="2.1">
          {play ? (
            <animate
              attributeName="d"
              values="M23 49c5-3 9 3 14 0s9 3 12 0;M23 49c5 3 9-3 14 0s9-3 12 0;M23 49c5-3 9 3 14 0s9 3 12 0"
              dur="1.8s"
              repeatCount="indefinite"
            />
          ) : null}
        </path>

        <circle cx="36" cy="28" r="10" fill="#FFFFFF" stroke="#173A63" strokeWidth="2.8" />
        <path d="M36 28l5-5" stroke="#D9A441" strokeWidth="3">
          {play ? (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-18 36 28;18 36 28;-18 36 28"
              dur="2.4s"
              repeatCount="indefinite"
            />
          ) : null}
        </path>
        <path d="M28 18l-3-4M44 18l3-4M26 28h-5M51 28h-5" stroke="#7D94A7" strokeWidth="2" />

        <path d="M57 21h6c3 0 5 2 5 5v8" stroke="#2F69A8" strokeWidth="2.6" />
        <path d="M68 34c0 4-2 7-5 9" stroke="#2F69A8" strokeWidth="2.6" strokeDasharray="4 4">
          {play ? (
            <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.1s" repeatCount="indefinite" />
          ) : null}
        </path>

        <circle cx="61" cy="47" r="2.2" fill="#D9A441">
          {play ? <animate attributeName="cy" values="50;43;50" dur="1.7s" repeatCount="indefinite" /> : null}
        </circle>
        <circle cx="66" cy="43" r="1.7" fill="#2F69A8">
          {play ? <animate attributeName="cy" values="46;39;46" dur="1.45s" repeatCount="indefinite" /> : null}
        </circle>
      </g>
    </svg>
  );
}
