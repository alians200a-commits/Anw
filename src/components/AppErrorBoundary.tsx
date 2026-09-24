import { Component, type ErrorInfo, type ReactNode } from 'react';
import { reportRuntimeIssue } from '../utils/runtimeDiagnostics';

type Props = { children: ReactNode };
type State = { failed: boolean };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    reportRuntimeIssue('app-boundary', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <main dir="rtl" className="grid min-h-screen place-items-center bg-[#07182c] px-5 text-center text-white">
        <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <h1 className="text-xl font-black">صار خطأ غير متوقع</h1>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/75">
            ما فقدنا بياناتك. جرّب إعادة تحميل التطبيق، وإذا تكررت المشكلة لا تكمل العملية الإدارية قبل التحقق منها.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 min-h-12 w-full rounded-2xl bg-white px-4 py-3 font-black text-[#07182c]"
          >
            إعادة تحميل
          </button>
        </section>
      </main>
    );
  }
}
