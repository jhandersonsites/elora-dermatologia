import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState, type KeyboardEvent } from 'react';
import { faq } from '../content';
import { LineReveal } from './motion/LineReveal';
import { ScrollReveal } from './motion/ScrollReveal';
import { EASE_OUT } from './motion/easing';
import './FAQ.css';

/**
 * Accessible accordion (WAI-ARIA pattern): buttons with aria-expanded /
 * aria-controls, labelled regions, and Arrow/Home/End to move between headers.
 */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = faq.length - 1;
    const target =
      event.key === 'ArrowDown'
        ? (index + 1) % faq.length
        : event.key === 'ArrowUp'
          ? (index - 1 + faq.length) % faq.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <header className="faq__header">
          <ScrollReveal>
            <p className="eyebrow">08 — Dúvidas</p>
          </ScrollReveal>
          <LineReveal id="faq-title" className="h2" lines={['Perguntas', <em key="f">frequentes.</em>]} />
          <ScrollReveal delay={0.1}>
            <p className="body-copy">
              Respostas gerais sobre o atendimento. Orientações sobre a sua pele são dadas somente em consulta.
            </p>
          </ScrollReveal>
        </header>

        <div className="faq__list">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const buttonId = `faq-button-${i}`;
            const panelId = `faq-panel-${i}`;
            return (
              <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <h3>
                  <button
                    ref={(el) => {
                      buttons.current[i] = el;
                    }}
                    id={buttonId}
                    type="button"
                    className="faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? panelId : undefined}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    <span>{item.question}</span>
                    <Plus className="faq__icon" size={20} strokeWidth={1.25} aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="faq__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE_OUT }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
