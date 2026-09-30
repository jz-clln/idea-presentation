"use client";
import { useEffect, useState, type ButtonHTMLAttributes } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize, Pause, Play, RotateCcw, X } from "lucide-react";
import { usePresentation } from "../hooks/usePresentation";
import { formatElapsed } from "../utils";

function Btn(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      onMouseUp={(e) => e.currentTarget.blur()}
      className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3.5 py-2 text-sm text-white transition hover:bg-white/20 disabled:opacity-30"
    />
  );
}

export function PresenterTimer() {
  const { timer } = usePresentation();
  const [elapsed, setElapsed] = useState(() => timer.getElapsed());

  useEffect(() => {
    setElapsed(timer.getElapsed());
    const id = window.setInterval(() => setElapsed(timer.getElapsed()), 250);
    return () => window.clearInterval(id);
  }, [timer]);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="font-body text-5xl font-medium tabular-nums tracking-tight">{formatElapsed(elapsed)}</div>
      <div className="flex gap-2">
        <Btn onClick={timer.toggle} aria-label={timer.isRunning ? "Pause timer" : "Resume timer"}>
          {timer.isRunning ? <Pause size={16} /> : <Play size={16} />}
        </Btn>
        <Btn onClick={timer.reset} aria-label="Reset timer">
          <RotateCcw size={16} /> Reset
        </Btn>
      </div>
    </div>
  );
}

export function PresenterControls() {
  const { previous, next, isFirst, isLast, toggleNavigator, toggleFullscreen, exitPresenter } = usePresentation();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Btn onClick={previous} disabled={isFirst}><ChevronLeft size={16} /> Previous</Btn>
      <Btn onClick={next} disabled={isLast}>Next <ChevronRight size={16} /></Btn>
      <div className="flex-1" />
      <Btn onClick={toggleNavigator}><LayoutGrid size={16} /> Overview</Btn>
      <Btn onClick={() => void toggleFullscreen()}><Maximize size={16} /> Fullscreen</Btn>
      <Btn onClick={exitPresenter}><X size={16} /> Exit</Btn>
    </div>
  );
}
