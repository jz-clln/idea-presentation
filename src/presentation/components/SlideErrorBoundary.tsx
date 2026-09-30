"use client";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { title: string; children: ReactNode }
interface State { error: Error | null }

/** One broken slide should never take down the whole deck. */
export class SlideErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(`[presentation] Slide "${this.props.title}" crashed:`, error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    const dev = process.env.NODE_ENV !== "production";
    return (
      <div className="absolute inset-0 flex flex-col justify-center gap-6 bg-[#2a0f0f] px-[160px] font-body text-white">
        <div className="text-subtitle font-semibold">This slide could not be shown</div>
        <div className="text-body opacity-80">Slide: {this.props.title}</div>
        {dev ? (
          <pre className="max-h-[520px] overflow-hidden whitespace-pre-wrap text-caption text-red-200">
            {error.message}
            {"\n\n"}
            {error.stack?.split("\n").slice(1, 8).join("\n")}
          </pre>
        ) : (
          <div className="text-body opacity-60">Use the arrow keys to continue.</div>
        )}
      </div>
    );
  }
}
