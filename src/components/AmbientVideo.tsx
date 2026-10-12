import { useReducedMotion } from 'motion/react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

type Props = {
  src: string;
  poster: string;
  className?: string;
  /** Load immediately (hero). Otherwise the file loads only near the viewport. */
  eager?: boolean;
  onPlayingChange?: (playing: boolean) => void;
};

export type AmbientVideoHandle = { toggle: () => void };

/**
 * Muted, looping, decorative background video.
 * - Never autoplays when the visitor prefers reduced motion (poster only).
 * - Pauses when off-screen to save battery and CPU.
 * - Falls back to the poster image if playback fails.
 */
export const AmbientVideo = forwardRef<AmbientVideoHandle, Props>(function AmbientVideo(
  { src, poster, className = '', eager = false, onPlayingChange },
  handle,
) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(eager);
  const [pageLoaded, setPageLoaded] = useState(() => document.readyState === 'complete');
  const [userPaused, setUserPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  // Eager (hero) videos still wait for the page's `load` event, so the poster,
  // fonts and scripts get the bandwidth first; others wait until near view.
  // With reduced motion the file is never downloaded — the poster stands alone.
  const hasSource = !failed && !reduce && (eager ? pageLoaded : inView);
  const shouldPlay = !reduce && !userPaused && inView && hasSource;

  useImperativeHandle(handle, () => ({ toggle: () => setUserPaused((p) => !p) }), []);

  useEffect(() => {
    if (pageLoaded) return;
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, [pageLoaded]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '200px 0px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldPlay) {
      el.play().catch(() => onPlayingChange?.(false));
    } else {
      el.pause();
    }
  }, [shouldPlay, onPlayingChange]);

  if (failed) {
    return <img className={className} src={poster} alt="" aria-hidden="true" />;
  }

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload={hasSource ? 'auto' : 'none'}
      aria-hidden="true"
      tabIndex={-1}
      onPlay={() => onPlayingChange?.(true)}
      onPause={() => onPlayingChange?.(false)}
      onError={() => setFailed(true)}
    >
      {hasSource && <source src={src} type="video/mp4" onError={() => setFailed(true)} />}
    </video>
  );
});
