import { motion, useReducedMotion, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useMediaQuery, MOBILE_QUERY } from '../../hooks/useMediaQuery';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { srcSetFor } from '../../lib/images';
import { EASE_OUT, REVEAL_VIEWPORT } from './easing';

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Inner parallax travel as a percentage of the frame height. */
  parallax?: number;
  /** Rendered width hint for srcset selection. */
  sizes?: string;
  eager?: boolean;
};

/**
 * Photograph revealed by an expanding clip mask, with an optional subtle
 * inner parallax. The frame reserves its space via CSS aspect-ratio.
 */
export function ImageReveal({ src, alt, className = '', parallax = 6, sizes = '(min-width: 768px) 45vw, 100vw', eager = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const travel = reduce ? 0 : isMobile ? parallax / 2 : parallax;

  const scrollYProgress = useScrollProgress(ref, ['start end', 'end start']);
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  return (
    <motion.div
      ref={ref}
      className={`image-reveal ${className}`}
      initial={reduce ? false : { clipPath: 'inset(14% 10% 14% 10%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 1.5, ease: EASE_OUT }}
    >
      <motion.img
        src={src}
        srcSet={srcSetFor(src)}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ y }}
        initial={reduce ? false : { scale: 1.22 }}
        // Keep a slight overscale so the parallax never exposes the frame edge.
        whileInView={{ scale: 1 + (travel * 2.2) / 100 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: 1.8, ease: EASE_OUT }}
      />
    </motion.div>
  );
}
