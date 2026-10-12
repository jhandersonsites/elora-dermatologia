import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT, REVEAL_VIEWPORT } from './easing';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  distance?: number;
  as?: 'div' | 'li' | 'p' | 'span';
};

/** Fades and lifts its content into place when it enters the viewport. */
export function ScrollReveal({ children, className, delay = 0, distance = 28, as = 'div' }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      // A full `transform` string (not `y`) lets Motion run this on the compositor (WAAPI).
      initial={reduce ? false : { opacity: 0, transform: `translateY(${distance}px)` }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 1.1, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}
