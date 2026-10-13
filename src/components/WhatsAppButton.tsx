import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useScrolledPast } from '../hooks/useScrolledPast';
import { whatsappUrl } from '../config/site';
import { WhatsAppIcon } from './Icons';
import { EASE_OUT } from './motion/easing';
import './WhatsAppButton.css';

const pastHero = (viewportHeight: number) => viewportHeight * 0.7;

/** True while the footer is on screen (it has its own WhatsApp action). */
function useFooterInView() {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  return inView;
}

/**
 * Persistent WhatsApp shortcut, shown once the visitor has scrolled past the
 * hero and hidden over the footer, so it never covers the footer links.
 */
export function WhatsAppButton() {
  const pastHeroSection = useScrolledPast(pastHero);
  const footerInView = useFooterInView();
  const visible = pastHeroSection && !footerInView;

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
