"use client";

import { useEffect, useRef, useState } from "react";

interface InstagramEmbedProps {
    url: string;
    captioned?: boolean;
}

export function InstagramEmbed({ url, captioned = false }: InstagramEmbedProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if script is already present
        if (!(window as any).instgrm) {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            script.onload = () => {
                setIsLoaded(true);
                (window as any).instgrm.Embeds.process();
            };
            document.body.appendChild(script);
        } else {
            setIsLoaded(true);
            (window as any).instgrm.Embeds.process();
        }
    }, []);

    useEffect(() => {
        if (isLoaded && (window as any).instgrm) {
            (window as any).instgrm.Embeds.process(containerRef.current);
        }
    }, [isLoaded, url]);

    // Extract the post ID or clean URL if needed, but the embed script usually handles the full URL
    // Ensure the URL ends with a trailing slash if it doesn't have query params, or handle as is.
    // Instagram embed script is picky about the URL format.
    
    return (
        <div ref={containerRef} className="w-full flex justify-center">
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                data-instgrm-captioned={captioned}
                style={{
                    background: "#FFF",
                    border: "0",
                    borderRadius: "3px",
                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "1px",
                    maxWidth: "540px",
                    minWidth: "326px",
                    padding: "0",
                    width: "calc(100% - 2px)",
                }}
            >
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#000' }}>
                    View this post on Instagram
                </a>
            </blockquote>
        </div>
    );
}
