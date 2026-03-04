"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    duration?: number;
}

export function AnimatedCounter({
    value,
    prefix = "",
    suffix = "",
    label,
    duration = 2000,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const startTime = performance.now();

        function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(value);
            }
        }

        requestAnimationFrame(animate);
    }, [isVisible, value, duration]);

    return (
        <div
            ref={ref}
            className={`p-8 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
            <p className="text-primary text-4xl font-bold tabular-nums md:text-5xl">
                {prefix}
                {count.toLocaleString("fr-FR")}
                {suffix}
            </p>
            <p className="text-muted-foreground mt-2 text-lg font-semibold md:text-xl">{label}</p>
        </div>
    );
}
