import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { useLayoutEffect, useRef, useState, type FocusEvent } from 'react';
import { APPOINTMENT_ANCHOR } from '../config/site';
import { treatments, type Treatment } from '../content';
import { DESKTOP_QUERY, useMediaQuery } from '../hooks/useMediaQuery';
import { srcSetFor } from '../lib/images';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { selectInterest } from '../lib/interest';
import { LineReveal } from './motion/LineReveal';
import { ScrollReveal } from './motion/ScrollReveal';
import './TreatmentShowcase.css';

/**
 * Desktop: the section pins while native vertical scrolling drives the
 * horizontal track (no wheel hijacking — the browser keeps control).
 * Touch / reduced motion: a native, swipeable scroll-snap row.
 */
export function TreatmentShowcase() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const pinned = isDesktop && !reduce;

  return pinned ? <PinnedShowcase /> : <SwipeShowcase />;
}

function Intro() {
  return (
    <div className="treatments__intro">
      <p className="eyebrow">02 — Tratamentos</p>
      <LineReveal
        id="treatments-title"
        className="h2"
        lines={[
          'Cuidados pensados',
          <>
            para <em>cada pele.</em>
          </>,
        ]}
      />
      <p className="body-copy">
        Áreas de atuação apresentadas de forma ilustrativa. Toda indicação depende de uma avaliação individual em
        consulta.
      </p>
    </div>
  );
}

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const titleId = `treatment-${treatment.id}`;
  return (
    <li className="treatment-card">
      <div className="treatment-card__media">
        <img
          src={treatment.image}
          srcSet={srcSetFor(treatment.image)}
          sizes="(min-width: 1024px) 25vw, min(78vw, 380px)"
          alt={treatment.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="treatment-card__body">
        <span className="index-number">0{index + 1}</span>
        <h3 className="h3" id={titleId}>
          {treatment.title}
        </h3>
        <p>{treatment.description}</p>
        <a
          href={APPOINTMENT_ANCHOR}
          className="text-link"
          aria-describedby={titleId}
          onClick={() => selectInterest(treatment.title)}
        >
          Agendar avaliação
          <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </li>
  );
}

function ClosingCard() {
  return (
    <li className="treatment-card treatment-card--closing">
      <p className="h3">
        Não sabe por onde começar? <em>A avaliação individual orienta o caminho.</em>
      </p>
      <a href={APPOINTMENT_ANCHOR} className="btn btn--primary">
        Agendar consulta
        <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </li>
  );
}

function PinnedShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const scrollYProgress = useScrollProgress(sectionRef, ['start start', 'end end']);
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progress = useTransform(smooth, [0, 1], [0.08, 1]);

  // Keyboard support: when focus lands on an off-screen card, scroll the page
  // to the point where the track brings that card into view.
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    const section = sectionRef.current;
    const card = (event.target as HTMLElement).closest('li');
    if (!section || !card || !distance) return;
    const target = Math.min(distance, Math.max(0, card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2));
    // Wait a frame so the browser's own focus scrolling has run, then correct it.
    requestAnimationFrame(() => window.scrollTo({ top: section.offsetTop + target, behavior: 'instant' }));
  };

  return (
    <section
      ref={sectionRef}
      id="tratamentos"
      className="treatments treatments--pinned"
      aria-labelledby="treatments-title"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="treatments__sticky">
        <div ref={viewportRef} className="treatments__viewport">
          <motion.div ref={trackRef} className="treatments__track" style={{ x }} onFocus={handleFocus}>
            <Intro />
            <ol className="treatments__list">
              {treatments.map((t, i) => (
                <TreatmentCard key={t.id} treatment={t} index={i} />
              ))}
              <ClosingCard />
            </ol>
          </motion.div>
        </div>
        <div className="treatments__progress container" aria-hidden="true">
          <span>01</span>
          <div className="treatments__bar">
            <motion.span style={{ scaleX: progress }} />
          </div>
          <span>0{treatments.length}</span>
        </div>
      </div>
    </section>
  );
}

function SwipeShowcase() {
  return (
    <section id="tratamentos" className="treatments treatments--swipe" aria-labelledby="treatments-title">
      <div className="container">
        <Intro />
      </div>
      <ScrollReveal>
        <ol className="treatments__list treatments__scroller" aria-label="Tratamentos — deslize para ver mais">
          {treatments.map((t, i) => (
            <TreatmentCard key={t.id} treatment={t} index={i} />
          ))}
          <ClosingCard />
        </ol>
      </ScrollReveal>
      <p className="container caption treatments__hint" aria-hidden="true">
        Deslize para ver mais →
      </p>
    </section>
  );
}
