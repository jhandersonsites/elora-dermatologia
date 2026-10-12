import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { APPOINTMENT_ANCHOR, navigation, site, whatsappUrl } from '../config/site';
import { WhatsAppIcon } from './Icons';
import { EASE_OUT } from './motion/easing';
import { Wordmark } from './Wordmark';

type Props = { open: boolean; onClose: () => void };

/** Full-screen, focus-trapped navigation dialog for small screens. */
export function MobileNavigation({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    document.body.classList.add('is-locked');
    panel?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>('a, button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const links = [...navigation, { label: 'Agendar consulta', href: APPOINTMENT_ANCHOR }];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-navigation"
          className="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="mobile-nav__top">
            <Wordmark />
            <button type="button" className="mobile-nav__close" onClick={onClose}>
              <X size={24} strokeWidth={1.4} aria-hidden="true" />
              <span className="visually-hidden">Fechar menu</span>
            </button>
          </div>

          <nav aria-label="Navegação principal (celular)">
            <ol className="mobile-nav__list">
              {links.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 + i * 0.06 }}
                >
                  <a href={item.href} onClick={onClose}>
                    <span className="index-number">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ol>
          </nav>

          <div className="mobile-nav__footer">
            <a
              className="btn btn--outline"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} />
              Falar pelo WhatsApp
            </a>
            <p className="caption">
              {site.address.district} · {site.address.city}, {site.address.state}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
