"use client";

import { useState } from "react";
import Image from "next/image";
import { getFrameByIndex } from "./robotConfig";

interface RobotAvatarProps {
  frameIndex: number; // -1 for Normal, 0..11 for sprites
  size?: number; // width & height in px
  showIndexBadge?: boolean;
  glow?: boolean;
  className?: string;
  isBouncing?: boolean;
  onClick?: () => void;
}

export default function RobotAvatar({
  frameIndex,
  size = 64,
  showIndexBadge = false,
  glow = true,
  className = "",
  isBouncing = false,
  onClick,
}: RobotAvatarProps) {
  const frame = getFrameByIndex(frameIndex);
  const [imgSrc, setImgSrc] = useState(frame.src);

  // If frame changes, update current src
  const currentSrc = imgSrc.includes(frameIndex === -1 ? "normal" : `frame_${frameIndex}`)
    ? imgSrc
    : frame.src;

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      style={{ width: size, height: size }}
      title={`${frame.label} (Index: ${frame.index === -1 ? "Normal" : frame.index})`}
    >
      {/* Ambient Radial Aura / Glow */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40 transition-all duration-300 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(18,178,89,0.5) 0%, rgba(6,182,212,0.3) 50%, transparent 80%)",
          }}
        />
      )}

      {/* Robot Image Container */}
      <div
        className={`relative z-10 w-full h-full flex items-center justify-center transition-transform duration-200 ${
          isBouncing ? "animate-bounce" : ""
        }`}
      >
        <Image
          src={currentSrc}
          alt={frame.label}
          width={size * 1.5}
          height={size * 1.5}
          priority
          unoptimized
          onError={() => {
            // fallback to original non-transparent if needed
            setImgSrc(frame.fallbackSrc);
          }}
          className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-all duration-150"
        />
      </div>

      {/* Frame Index Overlay Badge */}
      {showIndexBadge && (
        <span
          className="absolute -bottom-1 -right-1 z-20 px-1.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-md transition-colors"
          style={{
            backgroundColor: frame.index === -1 ? "#0a8540" : "#0284c7",
            color: "#ffffff",
          }}
        >
          {frame.index === -1 ? "Norm" : `#${frame.index}`}
        </span>
      )}
    </div>
  );
}
