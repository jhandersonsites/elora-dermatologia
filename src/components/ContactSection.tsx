import { site, whatsappUrl } from '../config/site';
import { AppointmentForm } from './AppointmentForm';
import { LineReveal } from './motion/LineReveal';
import { ScrollReveal } from './motion/ScrollReveal';
import './ContactSection.css';

export function ContactSection() {
  return (
    <section id="contato" className="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__info">
          <ScrollReveal>
            <p className="eyebrow">09 — Contato</p>
          </ScrollReveal>
          <LineReveal
            id="contact-title"
            className="h2"
            lines={[
              'Venha nos',
              <>
                <em>conhecer.</em>
              </>,
            ]}
          />

          <ScrollReveal delay={0.1}>
            <dl className="contact__list">
              <div>
                <dt>Endereço</dt>
                <dd>
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city} — {site.address.state}
                </dd>
              </div>
              <div>
                <dt>Telefone</dt>
                <dd>
                  <a href={site.phone.href}>{site.phone.display}</a>
                </dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                    {site.whatsapp.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt>Horários</dt>
                <dd>
                  {site.hours.map((h) => (
                    <span key={h.days} className="contact__hours">
                      <span>{h.days}</span>
                      <span>{h.time}</span>
                    </span>
                  ))}
                  <span className="caption">{site.appointmentModel}</span>
                </dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>

        <ScrollReveal className="contact__form" delay={0.15}>
          <AppointmentForm />
        </ScrollReveal>
      </div>
    </section>
  );
}
