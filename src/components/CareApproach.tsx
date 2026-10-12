import { motion, useInView, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { careSteps, type CareStep } from '../content';
import { srcSetFor } from '../lib/images';
import { LineReveal } from './motion/LineReveal';
import { ScrollReveal } from './motion/ScrollReveal';
import { EASE_OUT } from './motion/easing';
import './CareApproach.css';

/**
 * Sticky storytelling: on wide screens the image frame stays in place while
 * the steps scroll past; the frame cross-fades to the active step's image.
 * On small screens each step simply carries its own image.
 */
export function CareApproach() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  const scrollYProgress = useScrollProgress(listRef, ['start 0.6', 'end 0.6']);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="abordagem" className="approach" aria-labelledby="approach-title">
      <div className="container">
        <header className="approach__header">
          <ScrollReveal>
            <p className="eyebrow">04 — A abordagem</p>
          </ScrollReveal>
          <LineReveal
            id="approach-title"
            className="h2"
            lines={[
              'Um percurso',
              <>
                pensado <em>para você.</em>
              </>,
            ]}
          />
          <ScrollReveal delay={0.1}>
            <p className="body-copy">
              Uma proposta ilustrativa de como o atendimento pode ser conduzido — com calma, clareza e
              acompanhamento.
            </p>
          </ScrollReveal>
        </header>

        <div className="approach__layout">
          <div className="approach__stage" aria-hidden="true">
            <div className="approach__frame">
              {careSteps.map((step, i) => (
                <motion.img
                  key={step.title}
                  src={step.image}
                  srcSet={srcSetFor(step.image)}
                  sizes="45vw"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    transform: `scale(${reduce || i === active ? 1 : 1.06})`,
                  }}
                  transition={{ duration: 1.1, ease: EASE_OUT }}
                />
              ))}
              <span className="approach__counter">
                <span>0{active + 1}</span> / 0{careSteps.length}
              </span>
            </div>
          </div>

          <div className="approach__steps">
            <span className="approach__rail" aria-hidden="true">
              <motion.span style={{ scaleY: reduce ? 1 : lineScale }} />
            </span>
            <ol ref={listRef} className="approach__list">
              {careSteps.map((step, i) => (
                <Step key={step.title} step={step} index={i} isActive={i === active} onActive={setActive} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

type StepProps = {
  step: CareStep;
  index: number;
  isActive: boolean;
  onActive: (index: number) => void;
};

function Step({ step, index, isActive, onActive }: StepProps) {
  const ref = useRef<HTMLLIElement>(null);
  // Active while the step crosses the middle band of the viewport.
  const inBand = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inBand) onActive(index);
  }, [inBand, index, onActive]);

  return (
    <li ref={ref} className={`approach__step${isActive ? ' is-active' : ''}`}>
      <div className="approach__step-media">
        <img
          src={step.image}
          srcSet={srcSetFor(step.image)}
          sizes="100vw"
          alt={step.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <span className="approach__step-index">Etapa 0{index + 1}</span>
      <h3 className="h3">{step.title}</h3>
      <p className="body-copy">{step.description}</p>
    </li>
  );
}
