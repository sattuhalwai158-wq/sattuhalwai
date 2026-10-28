import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export function videoPoster(src: string) {
  const pathname = src.split("?")[0] ?? src;
  if (pathname.endsWith("video-1.mp4") || pathname.endsWith("illuminated-buffet-staging.mp4")) return "/media/videos/illuminated-buffet-staging-poster.jpg";
  if (pathname.endsWith("video-2.mp4") || pathname.endsWith("live-stalls-and-breakfast.mp4")) return "/media/videos/live-stalls-and-breakfast-poster.jpg";
  return "/media/home/our-story-brass-display-poster.webp";
}

export function VideoPreview({ src, title, poster = videoPoster(src), className = "" }: { src: string; title: string; poster?: string; className?: string }) {
  const player = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = player.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (!visible.current || document.hidden) { video.pause(); return; }
      if (!reducedMotion.matches && !userPaused.current) void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = !!entry?.isIntersecting;
      sync();
    }, { threshold: 0.5 });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    const motionChange = () => { if (reducedMotion.matches) video.pause(); else sync(); };
    reducedMotion.addEventListener("change", motionChange);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); reducedMotion.removeEventListener("change", motionChange); video.pause(); };
  }, [src]);
  return <div className={`relative overflow-hidden rounded-lg bg-secondary ${className}`}>
    <video ref={player} src={src} poster={poster} aria-label={title} muted loop playsInline controls preload="none" className="block aspect-[9/16] w-full object-contain"
      onPlay={() => { setPlaying(true); userPaused.current = false; setFailed(false); }}
      onPause={() => { setPlaying(false); if (visible.current && !document.hidden) userPaused.current = true; }}
      onError={() => setFailed(true)} />
    {!playing && !failed && <button type="button" aria-label={`Play ${title}`} className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90" onClick={() => { userPaused.current = false; void player.current?.play().catch(() => setFailed(true)); }}><Play className="ml-1 size-6" aria-hidden="true" /></button>}
    {failed && <p role="status" className="absolute inset-x-3 bottom-14 rounded-md bg-background/95 p-3 text-sm text-primary">Video unavailable. <a className="underline" href={src} target="_blank" rel="noreferrer">Open video</a></p>}
  </div>;
}
