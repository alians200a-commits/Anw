const ARABIC_PATTERN = /[\u0600-\u06FF]/;

function normalizeLabel(label: string) {
  const parts = label.split('|').map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return { arabic: label.trim(), english: '' };

  const first = parts[0];
  const second = parts.slice(1).join(' | ');
  const firstHasArabic = ARABIC_PATTERN.test(first);
  const secondHasArabic = ARABIC_PATTERN.test(second);

  if (!firstHasArabic && secondHasArabic) {
    return { arabic: second, english: first };
  }

  return { arabic: first, english: second };
}

interface BilingualLabelProps {
  label: string;
  className?: string;
  arabicClassName?: string;
  englishClassName?: string;
  separatorClassName?: string;
}

export function BilingualLabel({
  label,
  className = '',
  arabicClassName = '',
  englishClassName = '',
  separatorClassName = ''
}: BilingualLabelProps) {
  const { arabic, english } = normalizeLabel(label);

  if (!english) {
    return (
      <span dir="rtl" className={className}>
        {arabic}
      </span>
    );
  }

  return (
    <span
      dir="rtl"
      className={`inline-flex max-w-full flex-wrap items-baseline justify-end gap-x-1 ${className}`}
    >
      <span dir="rtl" lang="ar" className={arabicClassName}>
        {arabic}
      </span>
      <span dir="ltr" className="inline-flex min-w-0 items-baseline gap-x-1">
        <span aria-hidden="true" className={separatorClassName}>|</span>
        <span lang="en" className={englishClassName}>{english}</span>
      </span>
    </span>
  );
}
