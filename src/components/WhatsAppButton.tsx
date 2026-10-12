import { AnimatePresence, motion } from 'motion/react';
import { useScrolledPast } from '../hooks/useScrolledPast';
import { whatsappUrl } from '../config/site';
import { WhatsAppIcon } from './Icons';
import { EASE_OUT } from './motion/easing';
import './WhatsAppButton.css';

const pastHero = (viewportHeight: number) => viewportHeight * 0.7;

/** Persistent WhatsApp shortcut, shown once the visitor has scrolled past the hero. */
export function WhatsAppButton() {
  const visible = useScrolledPast(pastHero);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          className="wa-button"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar pelo WhatsApp (abre em nova aba)"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <WhatsAppIcon size={22} />
          <span className="wa-button__label" aria-hidden="true">
            WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
