import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT, REVEAL_VIEWPORT } from './easing';

type Props = {
  lines: ReactNode[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  id?: string;
  /** Animate on mount (hero) instead of on entering the viewport. */
  onMount?: boolean;
  delay?: number;
  stagger?: number;
};

/**
 * Editorial headline reveal: each line rises from behind a mask.
 * Visibility is observed on the heading itself — the masked lines start
 * fully clipped, so they could never be "in view" on their own.
 * The full text stays in the DOM, so it remains readable to assistive tech.
 */
export function LineReveal({ lines, as = 'h2', className, id, onMount = false, delay = 0, stagger = 0.09 }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  const line: Variants = {
    // `transform` strings (not `y`) are compositor-accelerated by Motion.
    hidden: { transform: 'translateY(108%)' },
    shown: (i: number) => ({
      transform: 'translateY(0%)',
      transition: { duration: 1.15, ease: EASE_OUT, delay: delay + i * stagger },
    }),
  };

  return (
    <Tag
      className={className}
      id={id}
      initial={reduce ? false : 'hidden'}
      {...(onMount ? { animate: 'shown' } : { whileInView: 'shown', viewport: REVEAL_VIEWPORT })}
    >
      {lines.map((content, i) => (
        <span className="line-mask" key={i}>
          <motion.span className="line-mask__inner" variants={line} custom={i}>
            {content}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
