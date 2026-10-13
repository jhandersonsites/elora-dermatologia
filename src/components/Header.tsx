import { Menu } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useScrolledPast } from '../hooks/useScrolledPast';
import { APPOINTMENT_ANCHOR, navigation, site } from '../config/site';
import { MobileNavigation } from './MobileNavigation';
import { Wordmark } from './Wordmark';
import './Header.css';

export function Header() {
  const scrolled = useScrolledPast(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <a href="#inicio" className="site-header__logo" aria-label={`${site.brand} ${site.brandSuffix} — início`}>
          <Wordmark />
        </a>

        <nav className="site-header__nav" aria-label="Navegação principal">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a href={APPOINTMENT_ANCHOR} className="btn btn--primary site-header__cta" aria-label="Agendar consulta">
            <span>
              Agendar<span className="site-header__cta-more"> consulta</span>
            </span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="site-header__menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.4} aria-hidden="true" />
            <span className="visually-hidden">Abrir menu</span>
          </button>
        </div>
      </div>

      <MobileNavigation open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
