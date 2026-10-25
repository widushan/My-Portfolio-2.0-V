"use client";

import { ROBOT_FRAMES, ROBOT_ACTIONS, RobotActionKey, getFrameByIndex } from "./robotConfig";
import { LuPlay, LuPause, LuSparkles, LuChevronRight } from "react-icons/lu";

interface PoseStudioProps {
  currentFrameIndex: number;
  activeActionKey: RobotActionKey | null;
  isPlaying: boolean;
  speedMs: number;
  onSelectIndex: (index: number) => void;
  onSelectAction: (actionKey: RobotActionKey) => void;
  onTogglePlay: () => void;
  onChangeSpeed: (speedMs: number) => void;
  onClose?: () => void;
}

export default function PoseStudio({
  currentFrameIndex,
  activeActionKey,
  isPlaying,
  speedMs,
  onSelectIndex,
  onSelectAction,
  onTogglePlay,
  onChangeSpeed,
  onClose,
}: PoseStudioProps) {
  const currentFrame = getFrameByIndex(currentFrameIndex);
  const activeAction = activeActionKey ? ROBOT_ACTIONS[activeActionKey] : null;

  return (
    <div className="border-b border-line bg-surface/90 backdrop-blur-md p-3.5 text-xs transition-all duration-300">
      {/* Header of studio */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 font-bold text-ink">
          <span className="text-base text-brand">🎮</span>
          <span>Robot Motion & Index Studio</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={onTogglePlay}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition ${
              isPlaying
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                : "bg-brand/15 text-brand-text border border-brand/30"
            }`}
            title={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <LuPause className="text-xs" /> : <LuPlay className="text-xs" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          {/* Speed Pills */}
          <div className="flex items-center bg-bg/80 rounded-md border border-line p-0.5">
            {[
              { label: "0.5x", val: 500 },
              { label: "1x", val: 260 },
              { label: "2x", val: 140 },
            ].map((s) => (
              <button
                key={s.val}
                type="button"
                onClick={() => onChangeSpeed(s.val)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition ${
                  speedMs === s.val
                    ? "bg-brand text-white font-bold"
                    : "text-muted hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-muted hover:text-ink px-1 py-0.5"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Action Presets Strip */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1">
          <LuSparkles className="text-brand" />
          <span>Preset Movement Sequences</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(ROBOT_ACTIONS) as RobotActionKey[]).map((key) => {
            const action = ROBOT_ACTIONS[key];
            const isSelected = activeActionKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectAction(key)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-brand-deep to-brand text-white shadow-sm ring-2 ring-brand/40 scale-105"
                    : "bg-bg border border-line text-ink hover:border-brand/60 hover:text-brand-text"
                }`}
              >
                <span>{action.icon}</span>
                <span>{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frame Sequence Visualizer if an action is playing */}
      {activeAction && (
        <div className="mb-3 p-2 rounded-lg bg-bg/60 border border-line/80 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <span className="text-[10px] font-semibold text-muted shrink-0">
            Seq:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
            {activeAction.sequence.map((seqIdx, i) => {
              const isCurrent = currentFrameIndex === seqIdx;
              return (
                <div key={i} className="flex items-center gap-1 shrink-0">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      isCurrent
                        ? "bg-brand text-white ring-2 ring-brand/50 scale-110"
                        : "bg-surface border border-line text-muted"
                    }`}
                  >
                    {seqIdx === -1 ? "Norm" : `#${seqIdx}`}
                  </span>
                  {i < activeAction.sequence.length - 1 && (
                    <LuChevronRight className="text-[9px] text-muted/60 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Direct Frame Index Selector Grid */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1.5 flex items-center justify-between">
          <span>Select Direct Frame Index</span>
          <span className="font-mono text-brand font-bold">
            Active: {currentFrameIndex === -1 ? "Normal View" : `Index #${currentFrameIndex}`}
          </span>
        </div>
        <div className="grid grid-cols-7 sm:grid-cols-13 gap-1">
          {ROBOT_FRAMES.map((f) => {
            const isSelected = currentFrameIndex === f.index;
            return (
              <button
                key={f.index}
                type="button"
                onClick={() => onSelectIndex(f.index)}
                title={`${f.label}: ${f.description}`}
                className={`py-1 px-0.5 rounded text-center font-mono font-bold text-[10px] transition-all ${
                  isSelected
                    ? "bg-brand text-white shadow-md ring-2 ring-brand/50 scale-105"
                    : "bg-bg border border-line text-muted hover:text-ink hover:border-brand/40"
                }`}
              >
                {f.index === -1 ? "Norm" : f.index}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Frame Info Card */}
      <div className="mt-2.5 pt-2 border-t border-line/60 flex items-center justify-between text-[11px]">
        <div className="truncate pr-2">
          <span className="font-bold text-ink">{currentFrame.label}</span>
          <span className="text-muted ml-1 hidden sm:inline truncate">
            — {currentFrame.description}
          </span>
        </div>
        <span className="shrink-0 px-2 py-0.5 rounded-full bg-brand/10 text-brand-text font-bold text-[10px]">
          {currentFrameIndex === -1 ? "1024x1024 HD" : "Sprite Frame"}
        </span>
      </div>
    </div>
  );
}
