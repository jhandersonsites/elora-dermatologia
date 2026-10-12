import { ArrowRight } from 'lucide-react';
import { APPOINTMENT_ANCHOR, site } from '../config/site';
import { doctorImage } from '../content';
import { ImageReveal } from './motion/ImageReveal';
import { LineReveal } from './motion/LineReveal';
import { ScrollReveal } from './motion/ScrollReveal';
import './DoctorProfile.css';

/**
 * Fictional professional. No degrees, registrations, affiliations or years of
 * experience are stated — a real client must supply verified credentials
 * (in Brazil, CFM rules require CRM and RQE in medical advertising).
 */
export function DoctorProfile() {
  return (
    <section className="doctor" aria-labelledby="doctor-title">
      <div className="container doctor__grid">
        <figure className="doctor__portrait">
          <ImageReveal
            className="doctor__image"
            src={doctorImage}
            alt="Profissional de saúde de máscara, touca e uniforme escuro durante um atendimento — imagem ilustrativa."
            parallax={5}
          />
          <figcaption className="caption">Imagem ilustrativa — não representa a profissional citada.</figcaption>
        </figure>

        <div className="doctor__content">
          <ScrollReveal>
            <p className="eyebrow">05 — A dermatologista</p>
          </ScrollReveal>

          <LineReveal
            id="doctor-title"
            className="h2 doctor__name"
            lines={site.doctor.name.split(/ (?=Vasconcelos)/)}
          />

          <ScrollReveal delay={0.1}>
            <p className="doctor__specialty">{site.doctor.specialty}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <blockquote className="doctor__quote">
              <p>“Uma abordagem que respeita a individualidade de cada pele.”</p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="body-copy">
              O atendimento parte de uma escuta atenta e de explicações claras, para que cada decisão sobre a sua
              pele seja tomada com informação, segurança e tranquilidade.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25} className="doctor__footer">
            <a href={APPOINTMENT_ANCHOR} className="btn btn--primary">
              Agendar consulta
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <p className="caption doctor__note">
              Perfil fictício para demonstração. No site real, aqui entram a formação e os registros profissionais
              (CRM/RQE) informados pela clínica.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
