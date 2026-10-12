import { ArrowRight, Pause, Play } from 'lucide-react';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import { useRef, useState, type CSSProperties } from 'react';
import { APPOINTMENT_ANCHOR, site } from '../config/site';
import { heroMedia } from '../content';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { DESKTOP_QUERY, useMediaQuery } from '../hooks/useMediaQuery';
import { AmbientVideo, type AmbientVideoHandle } from './AmbientVideo';
import './Hero.css';

/**
 * How long the hero's CSS intro has already been running. index.html ships a
 * static copy of this hero (header, photo, headline) so it paints before any
 * JavaScript; its intro starts at first paint. When React replaces it, the
 * same CSS animations resume from this offset, so nothing restarts or flashes.
 */
function introElapsed(): number {
  if (typeof document === 'undefined' || !document.querySelector('[data-hero-shell]')) return 0;
  const firstPaint = performance.getEntriesByName('first-contentful-paint')[0]?.startTime;
  return Math.max(0, performance.now() - (firstPaint ?? performance.now()));
}

const headline = [
  'Sua pele.',
  'Sua história.',
  <>
    Seu <em>melhor cuidado.</em>
  </>,
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<AmbientVideoHandle>(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed] = useState(introElapsed);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  // Scroll-linked depth: the film drifts and gently scales as the page moves on.
  const scrollYProgress = useScrollProgress(sectionRef, ['start start', 'end start']);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%']);

  const delay = (index: number) => ({ '--i': index }) as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="hero hero-intro"
      aria-labelledby="hero-title"
      style={{ '--intro-offset': `-${Math.round(elapsed)}ms` } as CSSProperties}
    >
      <div className="hero__media">
        <motion.div className="hero__media-inner" style={{ y: mediaY, scale: mediaScale }}>
          <AmbientVideo
            key={isDesktop ? 'desktop' : 'mobile'}
            ref={videoRef}
            className="hero__video"
            src={isDesktop ? heroMedia.video : heroMedia.videoSmall}
            poster={isDesktop ? heroMedia.poster : heroMedia.posterSmall}
            eager
            onPlayingChange={setPlaying}
          />
        </motion.div>

        <div className="hero__media-meta">
          <span className="hero__media-caption">
            {site.address.city} · {site.address.state}
          </span>
          {!reduce && (
            <button
              type="button"
              className="hero__toggle"
              onClick={() => videoRef.current?.toggle()}
              aria-pressed={!playing}
            >
              {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              <span className="visually-hidden">{playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}</span>
            </button>
          )}
        </div>
      </div>

      <motion.div className="hero__copy" style={{ y: copyY }}>
        <p className="eyebrow hero-fade" style={delay(0)}>
          Dermatologia contemporânea · {site.address.city}, {site.address.state}
        </p>

        <h1 id="hero-title" className="display hero__title">
          {headline.map((line, i) => (
            <span className="line-mask" key={i}>
              <span className="line-mask__inner hero-rise" style={delay(i)}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="lead hero__lead hero-fade" style={delay(5)}>
          Uma abordagem personalizada que une ciência dermatológica, tecnologia e atenção aos detalhes para
          cuidar da saúde da sua pele.
        </p>

        <div className="hero__actions hero-fade" style={delay(6)}>
          <a href={APPOINTMENT_ANCHOR} className="btn btn--primary">
            Agendar consulta
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <a href="#clinica" className="text-link">
            Conhecer a clínica
          </a>
        </div>
      </motion.div>

      <a href="#clinica" className="hero__scroll hero-fade" style={delay(10)}>
        <span className="hero__scroll-line" aria-hidden="true" />
        <span>Role para descobrir</span>
      </a>
    </section>
  );
}
