const ARABIC_PATTERN = /[\u0600-\u06FF]/;
const LATIN_PATTERN = /[A-Za-z0-9]/;

const LTR_RUN = /(\(?[A-Za-z0-9][A-Za-z0-9+%/.,:<>=°×⁺⁻₁₂₃₄₅₆₇₈₉₀²³\-–—]*(?:\s+(?:\([A-Za-z0-9][A-Za-z0-9+%/.,:<>=°×⁺⁻₁₂₃₄₅₆₇₈₉₀²³\-–—]*\)|[A-Za-z0-9][A-Za-z0-9+%/.,:<>=°×⁺⁻₁₂₃₄₅₆₇₈₉₀²³\-–—]*))*\)?)/g;

function DirectionSafeChunk({ text }: { text: string }) {
  const leading = text.match(/^\s*/)?.[0] ?? '';
  const trailing = text.match(/\s*$/)?.[0] ?? '';
  const coreEnd = Math.max(leading.length, text.length - trailing.length);
  const core = text.slice(leading.length, coreEnd);

  if (core && LATIN_PATTERN.test(core) && !ARABIC_PATTERN.test(core)) {
    return (
      <>
        {leading ? <span>{leading}</span> : null}
        <bdi dir="ltr" className="inline [unicode-bidi:isolate]">
          {core}
        </bdi>
        {trailing ? <span>{trailing}</span> : null}
      </>
    );
  }

  const parts = text.split(LTR_RUN);
  return (
    <>
      {parts.map((part, index) =>
        LATIN_PATTERN.test(part) && !ARABIC_PATTERN.test(part) ? (
          <bdi key={index} dir="ltr" className="inline [unicode-bidi:isolate]">
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
          <span key={index} dir="ltr" aria-hidden="true" className="inline-block px-0.5 [unicode-bidi:isolate]">
            |
          </span>
        ) : (
          <DirectionSafeChunk key={index} text={part} />
        )
      )}
    </span>
  );
}
