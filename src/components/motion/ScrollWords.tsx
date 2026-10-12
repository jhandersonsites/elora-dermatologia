import { motion, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useRef, type ReactNode } from 'react';

type Props = {
  text: string;
  /** Index of the first word rendered in the italic accent (to the end). */
  emphasisFrom?: number;
  className?: string;
  as?: 'h2' | 'p';
  id?: string;
};

/**
 * Scroll-linked reading effect: words brighten from a faint tint to full ink
 * as the passage moves through the viewport. Text is always present and
 * legible (min opacity 0.2 is decorative; the real text is in the DOM).
 */
export function ScrollWords({ text, emphasisFrom = Infinity, className, as = 'h2', id }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useScrollProgress(ref, ['start 0.85', 'end 0.45']);
  const words = text.split(' ');
  const Tag = as;

  if (reduce) {
    return (
      <Tag ref={ref} className={className} id={id}>
        {words.map((word, i) => (
          <span key={i}>{i >= emphasisFrom ? <em>{word}</em> : word} </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className} id={id} aria-label={text}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {i >= emphasisFrom ? <em>{word}</em> : word}
        </Word>
      ))}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <>
      <motion.span className="scroll-word" style={{ opacity }} aria-hidden="true">
        {children}
      </motion.span>{' '}
    </>
  );
}
