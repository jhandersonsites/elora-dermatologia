import { ArrowRight } from 'lucide-react';
import { APPOINTMENT_ANCHOR, site, whatsappUrl } from '../config/site';
import { ctaMedia } from '../content';
import { AmbientVideo } from './AmbientVideo';
import { WhatsAppIcon } from './Icons';
import { LineReveal } from './motion/LineReveal';
import { Parallax } from './motion/Parallax';
import { ScrollReveal } from './motion/ScrollReveal';
import './AppointmentCTA.css';

export function AppointmentCTA() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__media">
        <Parallax className="cta__media-inner" offset={50}>
          <AmbientVideo className="cta__video" src={ctaMedia.video} poster={ctaMedia.poster} />
        </Parallax>
      </div>

      <div className="container cta__content">
        <ScrollReveal>
          <p className="eyebrow">07 — Agendamento</p>
        </ScrollReveal>
        <LineReveal
          id="cta-title"
          className="h2 cta__title"
          lines={[
            'Seu próximo passo',
            <>
              começa com uma <em>conversa.</em>
            </>,
          ]}
        />
        <ScrollReveal delay={0.1}>
          <p className="lead cta__lead">
            Conheça nossa abordagem e descubra como uma avaliação individualizada pode orientar seus cuidados
            dermatológicos.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="cta__actions">
          <a href={APPOINTMENT_ANCHOR} className="btn btn--primary">
            Solicitar agendamento
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <a href={whatsappUrl()} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} />
            Falar pelo WhatsApp
          </a>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <p className="caption cta__note">
            {site.appointmentModel} · {site.address.district}, {site.address.city}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
