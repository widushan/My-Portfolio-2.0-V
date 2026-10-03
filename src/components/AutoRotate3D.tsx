"use client"; // Only needed in Next.js — safe to leave or delete in Vite

import { useEffect, useRef, type ReactNode } from "react";

type AutoRotate3DProps = {
    children: ReactNode;
    /** Layout classes for the outer box, e.g. "relative mx-auto w-full max-w-sm" */
    className?: string;
    /** Seconds for one full loop */
    duration?: number;
};

export default function AutoRotate3D({ children, className = "", duration = 9 }: AutoRotate3DProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = "ease-in-out";
        const anim = el.animate(
            [
                { transform: "rotateX(4deg) rotateY(-16deg)", easing: ease },
                { transform: "rotateX(-3deg) rotateY(-5deg)", easing: ease },
                { transform: "rotateX(-4deg) rotateY(16deg)", easing: ease },
                { transform: "rotateX(3deg) rotateY(5deg)", easing: ease },
                { transform: "rotateX(4deg) rotateY(-16deg)" },
            ],
            { duration: duration * 1000, iterations: Infinity }
        );
        return () => anim.cancel();
    }, [duration]);

    return (
        // Outer box holds the perspective; the inner box is what rotates
        <div className={className} style={{ perspective: "1000px" }}>
            <div
                ref={ref}
                className="relative will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </div>
        </div>
    );
}