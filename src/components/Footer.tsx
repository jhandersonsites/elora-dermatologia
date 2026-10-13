import { ArrowUp } from 'lucide-react';
import { APPOINTMENT_ANCHOR, navigation, site, whatsappUrl } from '../config/site';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { openPrivacyPolicy } from '../lib/privacy';
import { ScrollReveal } from './motion/ScrollReveal';
import './Footer.css';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="container">
        <ScrollReveal className="footer__brand">
          <p className="footer__wordmark" aria-hidden="true">
            {site.brand}
          </p>
          <p className="footer__tagline">{site.tagline}</p>
          <div className="footer__cta">
            <a href={APPOINTMENT_ANCHOR} className="btn btn--light">
              Agendar consulta
            </a>
            <a href={whatsappUrl()} className="btn btn--ghost-light" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} />
              Falar pelo WhatsApp
            </a>
          </div>
        </ScrollReveal>

        <div className="footer__cols">
          <nav aria-label="Rodapé">
            <h2 className="footer__heading">Navegação</h2>
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li>
                <a href={APPOINTMENT_ANCHOR}>Agendar consulta</a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">Contato</h2>
            <ul>
              <li>
                {site.address.street}, {site.address.district}
                <br />
                {site.address.city} — {site.address.state}
              </li>
              <li>
                <a href={site.phone.href}>{site.phone.display}</a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Horários</h2>
            <ul>
              {site.hours.map((h) => (
                <li key={h.days}>
                  {h.days}: {h.time}
                </li>
              ))}
              <li>{site.appointmentModel}</li>
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Social</h2>
            <ul>
              <li className="footer__social">
                <InstagramIcon size={18} />
                <span>
                  {site.instagram}
                  <span className="footer__muted"> (perfil fictício)</span>
                </span>
              </li>
              <li>
                <button type="button" className="footer__link-button" onClick={openPrivacyPolicy}>
                  Política de privacidade
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__demo">{site.demoNotice}</p>
          <p className="footer__muted">
            © {YEAR} {site.brand} {site.brandSuffix} · Demonstração criada por {site.studio.name}
          </p>
          <a href="#inicio" className="footer__top">
            Voltar ao topo
            <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
