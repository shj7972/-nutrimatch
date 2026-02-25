"use client";

import { useEffect } from "react";

interface AdBannerProps {
    slot: string;
    format?: "auto" | "rectangle" | "horizontal";
    className?: string;
}

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
    useEffect(() => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch {
            // AdSense not loaded yet
        }
    }, []);

    return (
        <div className={`overflow-hidden ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-2947913248390883"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
