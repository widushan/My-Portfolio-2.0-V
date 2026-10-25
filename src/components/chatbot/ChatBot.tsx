"use client";

import { useState, useEffect, useRef } from "react";
import RobotAvatar from "./RobotAvatar";
import PoseStudio from "./PoseStudio";
import {
  ROBOT_ACTIONS,
  RobotActionKey,
  getFrameByIndex,
} from "./robotConfig";
import { getBotReply, INITIAL_SUGGESTIONS } from "./botKnowledge";
import {
  LuSend,
  LuRotateCcw,
  LuX,
  LuSparkles,
  LuGamepad2,
  LuExternalLink,
  LuMessageSquare,
} from "react-icons/lu";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  actionKey?: RobotActionKey;
  targetIndex?: number;
  suggestions?: string[];
  links?: { label: string; url: string; isExternal?: boolean }[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showPoseStudio, setShowPoseStudio] = useState(false);

  // Robot Animation State
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(-1); // -1 = Normal view
  const [activeActionKey, setActiveActionKey] = useState<RobotActionKey | null>("idle");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMs, setSpeedMs] = useState<number>(300);
  const [seqStep, setSeqStep] = useState<number>(0);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "👋 Hi there! I'm **Robo-Widushan**, your interactive portfolio guide!\n\nAsk me anything about Widushan's **AI/ML projects**, **Web & Mobile apps**, **technical skills**, or **contact info**.\n\n✨ You can also tell me to **dance**, **walk**, or test my **12 movement frame indexes**!",
      timestamp: "Just now",
      suggestions: INITIAL_SUGGESTIONS,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Animation Loop based on activeAction and frame sequence
  useEffect(() => {
    if (!isPlaying || !activeActionKey) return;

    const action = ROBOT_ACTIONS[activeActionKey];
    if (!action || action.sequence.length === 0) return;

    const interval = setInterval(() => {
      setSeqStep((prev) => {
        const next = (prev + 1) % action.sequence.length;
        setCurrentFrameIndex(action.sequence[next]);
        return next;
      });
    }, speedMs || action.intervalMs);

    return () => clearInterval(interval);
  }, [isPlaying, activeActionKey, speedMs]);

  // Handle selecting a preset action
  const handleSelectAction = (key: RobotActionKey) => {
    setActiveActionKey(key);
    setIsPlaying(true);
    setSeqStep(0);
    const action = ROBOT_ACTIONS[key];
    if (action.sequence.length > 0) {
      setCurrentFrameIndex(action.sequence[0]);
    }
  };

  // Handle selecting a direct single frame index
  const handleSelectIndex = (index: number) => {
    setActiveActionKey(null);
    setIsPlaying(false);
    setCurrentFrameIndex(index);
  };

  // Toggle playback
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (!activeActionKey) {
        setActiveActionKey("walk");
      }
      setIsPlaying(true);
    }
  };

  // Send message
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Switch robot to thinking pose while processing!
    handleSelectAction("think");

    setTimeout(() => {
      const reply = getBotReply(text);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionKey: reply.actionKey,
        targetIndex: reply.targetIndex,
        suggestions: reply.suggestions,
        links: reply.links,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // React with corresponding animation or direct index!
      if (reply.actionKey) {
        handleSelectAction(reply.actionKey);
      } else if (reply.targetIndex !== undefined) {
        handleSelectIndex(reply.targetIndex);
      } else {
        handleSelectAction("idle");
      }
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "msg-welcome-new",
        sender: "bot",
        text: "Chat cleared! How can I assist you with Widushan's portfolio?",
        timestamp: "Just now",
        suggestions: INITIAL_SUGGESTIONS,
      },
    ]);
    handleSelectAction("idle");
  };

  const currentFrame = getFrameByIndex(currentFrameIndex);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* ---------------- CHAT WINDOW POPUP ---------------- */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Portfolio Assistant"
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[82vh] flex flex-col rounded-3xl bg-surface/95 dark:bg-[#0d1410]/95 backdrop-blur-xl border border-line dark:border-emerald-500/20 shadow-2xl shadow-emerald-950/20 dark:shadow-black/60 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-bg/80 dark:bg-[#111a14]/90 border-b border-line dark:border-line/60 flex items-center justify-between gap-3 shrink-0">
            {/* Robot Avatar and Name */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => setShowPoseStudio(!showPoseStudio)}
              title="Click to toggle Pose & Index Studio"
            >
              <div className="relative">
                <RobotAvatar
                  frameIndex={currentFrameIndex}
                  size={48}
                  showIndexBadge
                  glow
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-surface animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-ink group-hover:text-brand transition">
                    Robo-Widushan
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase bg-brand/15 text-brand-text">
                    AI
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-muted">
                  <span className="truncate max-w-[150px]">
                    {activeActionKey
                      ? `${ROBOT_ACTIONS[activeActionKey]?.icon} ${ROBOT_ACTIONS[activeActionKey]?.name}`
                      : `${currentFrame.shortLabel}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              {/* Pose Studio Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPoseStudio(!showPoseStudio)}
                className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-semibold transition ${
                  showPoseStudio
                    ? "bg-brand text-white shadow-sm"
                    : "text-muted hover:text-ink hover:bg-bg"
                }`}
                title="Toggle Robot Pose & Index Studio"
              >
                <LuGamepad2 className="text-sm" />
                <span className="text-[11px] hidden sm:inline">Studio</span>
              </button>

              {/* Clear chat */}
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-bg transition text-sm"
                title="Clear conversation"
              >
                <LuRotateCcw />
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-bg transition text-sm"
                title="Close chat"
              >
                <LuX />
              </button>
            </div>
          </div>

          {/* Pose Studio Drawer (Expandable) */}
          {showPoseStudio && (
            <PoseStudio
              currentFrameIndex={currentFrameIndex}
              activeActionKey={activeActionKey}
              isPlaying={isPlaying}
              speedMs={speedMs}
              onSelectIndex={handleSelectIndex}
              onSelectAction={handleSelectAction}
              onTogglePlay={handleTogglePlay}
              onChangeSpeed={setSpeedMs}
              onClose={() => setShowPoseStudio(false)}
            />
          )}

          {/* Chat Messages List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 text-sm">
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-sm ${
                      isBot
                        ? "bg-bg dark:bg-[#16201a] border border-line dark:border-line/60 text-ink rounded-tl-sm"
                        : "bg-brand-deep text-white rounded-tr-sm"
                    }`}
                  >
                    {/* Render message text with basic formatting */}
                    <div className="whitespace-pre-line leading-relaxed space-y-1">
                      {msg.text.split("\n").map((line, i) => {
                        // Bold markdown parser: **text**
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={i}>
                            {parts.map((part, pIdx) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return (
                                  <strong key={pIdx} className="font-bold">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>

                    {/* Interactive External / Section Links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-line/50 dark:border-line/30 flex flex-wrap gap-1.5">
                        {msg.links.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target={link.isExternal ? "_blank" : undefined}
                            rel={link.isExternal ? "noreferrer" : undefined}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-brand/10 text-brand-text dark:bg-brand/20 hover:bg-brand hover:text-white transition"
                          >
                            <span>{link.label}</span>
                            {link.isExternal && <LuExternalLink className="text-[10px]" />}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => handleSendMessage(sug)}
                          className="px-2.5 py-1 rounded-full text-xs bg-surface border border-line text-ink hover:border-brand hover:text-brand-text transition shadow-xs text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="mt-1 text-[10px] text-muted px-1">{msg.timestamp}</span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-muted text-xs bg-bg dark:bg-[#16201a] border border-line px-3.5 py-2 rounded-2xl w-fit rounded-tl-sm animate-pulse">
                <RobotAvatar frameIndex={currentFrameIndex} size={20} glow={false} />
                <span>Robo-Widushan is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Bar above input - no horizontal scrollbar */}
          <div className="px-3 py-1.5 bg-bg/50 dark:bg-[#101712]/70 border-t border-line/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-xs shrink-0">
            <span className="text-[10px] text-muted uppercase font-bold shrink-0">Try:</span>
            {[
              { label: "💃 Dance", text: "Dance for me!" },
              { label: "🚶 Walk", text: "Walk for me" },
              { label: "💡 Ideas", text: "Got an idea?" },
              { label: "💼 Projects", text: "Show top AI & ML projects" },
              { label: "📞 Contact", text: "How can I contact Widushan?" },
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q.text)}
                className="px-2 py-0.5 rounded-full text-[11px] bg-surface dark:bg-[#19241e] border border-line text-ink hover:border-brand hover:text-brand-text transition shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Bottom Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-surface/90 dark:bg-[#111a14]/90 border-t border-line flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything or say 'dance'..."
              className="flex-1 rounded-xl border border-line bg-bg px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand placeholder:text-muted transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-brand-deep text-white hover:bg-[#087338] disabled:opacity-40 disabled:hover:bg-brand-deep transition shadow-sm"
              title="Send message"
            >
              <LuSend className="text-sm" />
            </button>
          </form>
        </div>
      )}

      {/* ---------------- FLOATING ROBOT TRIGGER BUTTON (ALWAYS BOTTOM-RIGHT) ---------------- */}
      <div className="relative flex items-center">
        {/* Welcome Speech Balloon / Tooltip when closed */}
        {!isOpen && showTooltip && (
          <div className="absolute right-full mr-4 bottom-1/2 translate-y-1/2 w-52 sm:w-64 p-3 rounded-2xl bg-surface/95 dark:bg-[#141f18]/95 backdrop-blur-md border border-line dark:border-emerald-500/30 shadow-2xl text-xs text-ink animate-in fade-in slide-in-from-right-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute top-2 right-2 text-muted hover:text-ink text-xs p-0.5 rounded-md hover:bg-bg transition"
              title="Dismiss"
            >
              ✕
            </button>
            <div className="flex items-center gap-1.5 font-bold text-brand-text mb-1">
              <LuSparkles className="text-sm" />
              <span className="text-xs sm:text-sm">Hi! Need help?</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Chat with my AI assistant or explore my robot movements!
            </p>
          </div>
        )}

        {/* Floating Robot Avatar Button - Large & Prominent */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open portfolio chatbot"
          className="group relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-surface/95 dark:bg-[#131c16]/95 backdrop-blur-xl border-2 border-emerald-500/40 hover:border-emerald-400 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Glowing Radial Aura */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-deep/30 via-emerald-500/20 to-cyan-500/30 blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Large Interactive Robot Avatar */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-1">
            <RobotAvatar
              frameIndex={currentFrameIndex}
              size={98}
              showIndexBadge={false}
              glow={false}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Online green indicator badge */}
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-surface items-center justify-center shadow-md">
              <span className="w-2 h-2 rounded-full bg-white" />
            </span>
          </span>

          {/* Open/Close Icon Overlay */}
          <div className="absolute -bottom-1 -right-1 p-2 rounded-full bg-brand-deep text-white shadow-xl text-xs flex items-center justify-center z-20 group-hover:scale-110 transition-transform">
            {isOpen ? <LuX className="text-sm" /> : <LuMessageSquare className="text-sm" />}
          </div>
        </button>
      </div>
    </div>
  );
}
