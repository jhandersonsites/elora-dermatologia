import { cancelFrame, frame } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/**
 * True once the page is scrolled past `threshold` px (or a function of the
 * viewport height). Replaces a per-frame Motion `useScroll()` page tracker,
 * which read scrollHeight/clientHeight on every frame. The scroll position is
 * read once per frame in Motion's read phase (never inside the event itself,
 * where it can force a synchronous layout) and state is only set on a flip.
 */
export function useScrolledPast(threshold: number | ((viewportHeight: number) => number)): boolean {
  const [past, setPast] = useState(false);
  const current = useRef(past);

  useEffect(() => {
    const limit = () => (typeof threshold === 'function' ? threshold(window.innerHeight) : threshold);
    const check = () => {
      const next = window.scrollY > limit();
      if (next !== current.current) {
        current.current = next;
        setPast(next);
      }
    };
    const schedule = () => frame.read(check);
    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelFrame(check);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [threshold]); // pass a number or a module-level function so this stays stable

  return past;
}
