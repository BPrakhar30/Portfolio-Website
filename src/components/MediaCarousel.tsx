"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectMedia } from "@/data/projectsContent";

function extractSpotifyId(url: string): string | null {
  const match = url.match(/open\.spotify\.com\/(show|episode|playlist)\/([a-zA-Z0-9]+)/);
  return match ? match[2] : null;
}

function extractSpotifyType(url: string): string {
  const match = url.match(/open\.spotify\.com\/(show|episode|playlist)\//);
  return match ? match[1] : "show";
}

function MediaItem({
  item,
  theme,
}: {
  item: ProjectMedia;
  theme: "light" | "dark";
}) {
  const borderClass = theme === "dark" ? "border-white/10" : "border-gray-100";
  const captionClass = theme === "dark" ? "text-gray-500" : "text-gray-400";

  if (item.type === "youtube") {
    return (
      <figure>
        <div className={`relative w-full aspect-video rounded-2xl overflow-hidden ${borderClass} border`}>
          <iframe
            src={`https://www.youtube.com/embed/${item.src}`}
            title={item.caption ?? "Project video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        {item.caption && (
          <figcaption className={`text-xs ${captionClass} text-center mt-3`}>{item.caption}</figcaption>
        )}
      </figure>
    );
  }

  if (item.type === "spotify") {
    const spotifyId = extractSpotifyId(item.src);
    const spotifyType = extractSpotifyType(item.src);
    if (!spotifyId) return null;
    return (
      <figure>
        <div className={`w-full rounded-2xl overflow-hidden ${borderClass} border`}>
          <iframe
            src={`https://open.spotify.com/embed/${spotifyType}/${spotifyId}?utm_source=generator&theme=0`}
            title={item.caption ?? "Spotify embed"}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full"
            style={{ height: 352 }}
          />
        </div>
        {item.caption && (
          <figcaption className={`text-xs ${captionClass} text-center mt-3`}>{item.caption}</figcaption>
        )}
      </figure>
    );
  }

  if (item.type === "video") {
    return (
      <figure>
        <video
          src={item.src}
          controls
          className={`w-full rounded-2xl ${borderClass} border`}
          playsInline
        />
        {item.caption && (
          <figcaption className={`text-xs ${captionClass} text-center mt-3`}>{item.caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.caption ?? "Project screenshot"}
        className={`max-w-full max-h-[70vh] rounded-2xl object-contain ${borderClass} border mx-auto`}
      />
      {item.caption && (
        <figcaption className={`text-xs ${captionClass} text-center mt-3`}>{item.caption}</figcaption>
      )}
    </figure>
  );
}

export function MediaCarousel({
  media,
  theme = "light",
}: {
  media: ProjectMedia[];
  theme?: "light" | "dark";
}) {
  const [current, setCurrent] = useState(0);
  const total = media.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  if (total === 0) return null;

  const isDark = theme === "dark";
  const arrowBg = isDark
    ? "bg-white/10 hover:bg-white/20 text-white"
    : "bg-gray-100 hover:bg-gray-200 text-gray-700";
  const dotActive = isDark ? "bg-indigo-400" : "bg-gray-800";
  const dotInactive = isDark ? "bg-white/20" : "bg-gray-300";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full flex items-center justify-center">
        {total > 1 && (
          <button
            onClick={prev}
            className={`absolute left-0 z-10 p-2 rounded-full transition-colors ${arrowBg}`}
            aria-label="Previous media"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className={`w-full ${total > 1 ? "px-12" : ""}`}>
          <MediaItem item={media[current]} theme={theme} />
        </div>

        {total > 1 && (
          <button
            onClick={next}
            className={`absolute right-0 z-10 p-2 rounded-full transition-colors ${arrowBg}`}
            aria-label="Next media"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center gap-2 mt-4">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? dotActive : dotInactive}`}
              aria-label={`Go to media ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
