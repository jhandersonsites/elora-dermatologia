import { motion, useReducedMotion, useTransform } from 'motion/react';
import { useRef } from 'react';
import { site } from '../config/site';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { editorialMedia } from '../content';
import { AmbientVideo } from './AmbientVideo';
import { ImageReveal } from './motion/ImageReveal';
import { LineReveal } from './motion/LineReveal';
import { Parallax } from './motion/Parallax';
import { ScrollReveal } from './motion/ScrollReveal';
import { EASE_OUT, REVEAL_VIEWPORT } from './motion/easing';
import './EditorialStory.css';

const values = [
  'Avaliação antes de qualquer indicação.',
  'Informação clara sobre cada etapa.',
  'Naturalidade como princípio.',
];

export function EditorialStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // The page "dims the lights" as the section arrives: cream → charcoal.
  // A charcoal layer fades in (composited opacity) instead of animating
  // background-color, which repainted this whole tall section every frame.
  const arrival = useScrollProgress(sectionRef, ['start end', 'start start']);
  // Fully dark before the headline reveals (its trigger sits ~12% into the viewport).
  const shade = useTransform(arrival, [0, 0.18], [0, 1]);

  const filmProgress = useScrollProgress(filmRef, ['start end', 'end start']);
  const filmY = useTransform(filmProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);

  return (
    <section
      ref={sectionRef}
      className="story on-dark"
      aria-labelledby="story-title"
    >
      <motion.div className="story__shade" style={{ opacity: reduce ? 1 : shade }} aria-hidden="true" />
      <div className="container story__grid">
        <div className="story__head">
          <ScrollReveal>
            <p className="eyebrow">03 — Precisão</p>
          </ScrollReveal>
          <LineReveal
            id="story-title"
            className="h2 story__title"
            lines={[
              'Precisão científica.',
              <>
                <em>Sensibilidade</em> em
              </>,
              'cada detalhe.',
            ]}
          />
        </div>

        <motion.div
          ref={filmRef}
          className="story__film"
          initial={reduce ? false : { clipPath: 'inset(0% 0% 0% 100%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 1.6, ease: EASE_OUT }}
        >
          <motion.div className="story__film-inner" style={{ y: filmY }}>
            <AmbientVideo className="story__video" src={editorialMedia.video} poster={editorialMedia.poster} />
          </motion.div>
        </motion.div>

        <Parallax className="story__detail" offset={90}>
          <ImageReveal
            className="story__detail-image"
            src={editorialMedia.detail}
            alt="Detalhe da pele do rosto iluminada pelo sol, com sardas e textura natural."
          />
          <p className="caption story__caption">Imagens ilustrativas</p>
        </Parallax>

        <div className="story__text">
          <ScrollReveal>
            <p className="lead">
              Cada pele tem uma história, uma textura e um ritmo. Por isso, o cuidado na {site.brand} combina o
              rigor da avaliação dermatológica com um olhar atento à sua individualidade.
            </p>
          </ScrollReveal>
        </div>

        <ol className="story__values">
          {values.map((value, i) => (
            <ScrollReveal as="li" key={value} delay={0.1 * i}>
              <span className="index-number">0{i + 1}</span>
              <p>{value}</p>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
