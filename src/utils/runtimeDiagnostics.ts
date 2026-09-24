export type RuntimeIssueScope =
  | 'published-drugs'
  | 'published-equipment'
  | 'published-fluids'
  | 'favorites-storage'
  | 'app-boundary';

function safeMessage(error: unknown): string {
  if (error instanceof Error) return error.message.slice(0, 240);
  if (typeof error === 'string') return error.slice(0, 240);
  return 'Unknown runtime error';
}

/**
 * Keep production diagnostics deliberately small: no user payloads, tokens,
 * request bodies, e-mails, or database rows are written to the console.
 */
export function reportRuntimeIssue(scope: RuntimeIssueScope, error: unknown): void {
  console.warn(`[Dalili:${scope}] ${safeMessage(error)}`);
}
