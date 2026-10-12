import { ArrowRight } from 'lucide-react';
import { site } from '../config/site';
import { statementImage } from '../content';
import { ImageReveal } from './motion/ImageReveal';
import { Parallax } from './motion/Parallax';
import { ScrollReveal } from './motion/ScrollReveal';
import { ScrollWords } from './motion/ScrollWords';
import './BrandStatement.css';

const principles = [
  { title: 'Atenção individual', text: 'Tempo para ouvir, examinar e explicar.' },
  { title: 'Cuidado responsável', text: 'Indicações baseadas em avaliação, nunca em tendência.' },
  { title: 'Planejamento cuidadoso', text: 'Etapas claras, construídas junto com você.' },
];

export function BrandStatement() {
  return (
    <section id="clinica" className="statement" aria-labelledby="statement-title">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">01 — A clínica</p>
        </ScrollReveal>

        <ScrollWords
          as="h2"
          id="statement-title"
          className="h2 statement__title"
          text="Cuidar da pele é olhar para além da superfície."
          emphasisFrom={6}
        />

        <div className="statement__grid">
          <Parallax className="statement__media" offset={50}>
            <ImageReveal
              className="statement__image"
              src={statementImage}
              alt="Arranjo de folhas e flores secas em tons de areia, em um vaso de cerâmica."
            />
            <p className="caption statement__caption">Imagem ilustrativa</p>
          </Parallax>

          <div className="statement__body">
            <ScrollReveal>
              <p className="lead">
                Na {site.brand}, cada consulta começa pela escuta. Entender quem você é, como vive e o que espera do
                cuidado com a pele é o que orienta cada recomendação.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="body-copy">
                Acreditamos em uma dermatologia responsável: avaliação criteriosa, informação clara e planos
                construídos com calma — sem promessas fáceis e sem excessos.
              </p>
            </ScrollReveal>

            <dl className="statement__principles">
              {principles.map((item, i) => (
                <ScrollReveal key={item.title} className="statement__principle" delay={0.08 * i}>
                  <dt>
                    <span className="index-number">0{i + 1}</span>
                    {item.title}
                  </dt>
                  <dd>{item.text}</dd>
                </ScrollReveal>
              ))}
            </dl>

            <ScrollReveal>
              <a href="#abordagem" className="text-link">
                Conheça a abordagem
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
