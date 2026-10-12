import { frame, useMotionValue, type MotionValue } from 'motion/react';
import { useEffect, type RefObject } from 'react';

/**
 * Drop-in replacement for Motion's `useScroll({ target, offset }).scrollYProgress`.
 *
 * Why: Motion's JS scroll tracker re-measures every target (offsetParent walk,
 * client/scroll sizes) on every scroll frame. With ~20 tracked elements those
 * layout reads, interleaved with the previous frame's style writes, were the
 * main cause of scroll jank. Element positions don't change while scrolling,
 * so here they are measured once and re-measured only when layout changes
 * (resize, content/size changes, fonts). Each scroll frame is pure arithmetic.
 *
 * Offsets use Motion's notation: `"<target edge> <viewport edge>"`, e.g.
 * `['start end', 'end start']`. Edges: start | center | end | 0–1 fraction.
 */
export type ScrollOffset = [string, string];

type Entry = {
  el: HTMLElement;
  points: [[number, number], [number, number]];
  value: MotionValue<number>;
  start: number;
  end: number;
};

const EDGES: Record<string, number> = { start: 0, center: 0.5, end: 1 };
const parseEdge = (s: string) => (s in EDGES ? EDGES[s] : parseFloat(s));
const parseOffset = (o: string): [number, number] => {
  const [target, viewport] = o.trim().split(/\s+/);
  return [parseEdge(target), parseEdge(viewport ?? target)];
};

const entries = new Set<Entry>();
let listening = false;
let measureQueued = false;

/** Layout position in the document, ignoring transforms (like Motion does). */
function documentTop(el: HTMLElement) {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

function measureEntry(entry: Entry, viewport: number) {
  const top = documentTop(entry.el);
  const height = entry.el.offsetHeight;
  const [[t0, v0], [t1, v1]] = entry.points;
  entry.start = top + t0 * height - v0 * viewport;
  entry.end = top + t1 * height - v1 * viewport;
}

function updateEntry(entry: Entry, scrollY: number) {
  const span = entry.end - entry.start;
  const p = span === 0 ? (scrollY >= entry.end ? 1 : 0) : (scrollY - entry.start) / span;
  const clamped = p < 0 ? 0 : p > 1 ? 1 : p;
  if (entry.value.get() !== clamped) entry.value.set(clamped);
}

function updateAll() {
  const y = window.scrollY;
  entries.forEach((e) => updateEntry(e, y));
}

function measureAll() {
  measureQueued = false;
  const viewport = window.innerHeight;
  entries.forEach((e) => measureEntry(e, viewport)); // reads only, batched
  updateAll();
}

const onScroll = () => frame.read(updateAll);
const queueMeasure = () => {
  if (measureQueued) return;
  measureQueued = true;
  frame.read(measureAll);
};

let resizeObserver: ResizeObserver | null = null;

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', queueMeasure, { passive: true });
  window.addEventListener('load', queueMeasure);
  document.fonts?.ready.then(queueMeasure);
  // Any change in page height (images, accordions, pinned sections) moves targets.
  resizeObserver = new ResizeObserver(queueMeasure);
  resizeObserver.observe(document.body);
}

function stopListening() {
  if (!listening || entries.size) return;
  listening = false;
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', queueMeasure);
  window.removeEventListener('load', queueMeasure);
  resizeObserver?.disconnect();
  resizeObserver = null;
}

export function useScrollProgress(ref: RefObject<HTMLElement | null>, offset: ScrollOffset): MotionValue<number> {
  const value = useMotionValue(0);
  const [a, b] = offset;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const entry: Entry = { el, points: [parseOffset(a), parseOffset(b)], value, start: 0, end: 0 };
    entries.add(entry);
    startListening();
    // One batched read for every element mounted in this commit, next frame —
    // never a layout read per hook during mount.
    queueMeasure();
    return () => {
      entries.delete(entry);
      stopListening();
    };
  }, [ref, a, b, value]);

  return value;
}
