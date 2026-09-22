const LTR_RUN = /([A-Za-z0-9][A-Za-z0-9+%/().,:<>=°×⁺⁻₁₂₃₄₅₆₇₈₉₀²³\-–—]*(?:\s+[A-Za-z0-9][A-Za-z0-9+%/().,:<>=°×⁺⁻₁₂₃₄₅₆₇₈₉₀²³\-–—]*)*)/g;

function DirectionSafeChunk({ text }: { text: string }) {
  const parts = text.split(LTR_RUN);
  return (
    <>
      {parts.map((part, index) =>
        /^[A-Za-z0-9]/.test(part) ? (
          <bdi key={index} dir="ltr" className="inline">
            {part}
          </bdi>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

export function MixedDirectionText({ text }: { text: string }) {
  const parts = text.split(/(\s*\|\s*)/);

  return (
    <span dir="rtl" className="[unicode-bidi:isolate]">
      {parts.map((part, index) =>
        part.includes('|') ? (
          <span key={index} dir="ltr" aria-hidden="true" className="inline-block px-0.5">
            |
          </span>
        ) : (
          <DirectionSafeChunk key={index} text={part} />
        )
      )}
    </span>
  );
}
