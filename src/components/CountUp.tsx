"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
    /** Number to count up to */
    end: number;
    /** Text after the number, e.g. "+" */
    suffix?: string;
    /** Animation length in milliseconds */
    duration?: number;
};

export default function CountUp({ end, suffix = "", duration = 1800 }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Reduced motion: jump straight to the final number
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setValue(end);
            return;
        }

        let raf = 0;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                io.disconnect(); // count once

                const start = performance.now();
                const tick = (now: number) => {
                    const t = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - t, 3); // fast start, gentle finish
                    setValue(Math.round(end * eased));
                    if (t < 1) raf = requestAnimationFrame(tick);
                };
                raf = requestAnimationFrame(tick);
            },
            { threshold: 0.4 }
        );
        io.observe(el);

        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [end, duration]);

    return (
        <>
            {/* Screen readers get the final number, not every step of the count */}
            <span className="sr-only">
                {end}
                {suffix}
            </span>
            <span ref={ref} aria-hidden="true">
                {value}
                {suffix}
            </span>
        </>
    );
}