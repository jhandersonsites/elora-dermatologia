import { motion, useReducedMotion, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useMediaQuery, MOBILE_QUERY } from '../../hooks/useMediaQuery';

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum travel in px (halved on mobile, disabled for reduced motion). */
  offset?: number;
};

/** Moves its content against the scroll direction for gentle depth. */
export function Parallax({ children, className, offset = 60 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const travel = reduce ? 0 : isMobile ? offset / 2 : offset;

  const scrollYProgress = useScrollProgress(ref, ['start end', 'end start']);
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <motion.div ref={ref} className={`scroll-layer ${className ?? ''}`} style={{ y }}>
      {children}
    </motion.div>
  );
}
