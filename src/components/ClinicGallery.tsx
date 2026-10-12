import { gallery } from '../content';
import { ImageReveal } from './motion/ImageReveal';
import { LineReveal } from './motion/LineReveal';
import { Parallax } from './motion/Parallax';
import { ScrollReveal } from './motion/ScrollReveal';
import './ClinicGallery.css';

/** Per-image parallax travel: varied depths make the composition feel layered. */
const depths = [40, 90, 20, 70, 50];

export function ClinicGallery() {
  return (
    <section className="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <header className="gallery__header">
          <ScrollReveal>
            <p className="eyebrow">06 — O ambiente</p>
          </ScrollReveal>
          <LineReveal
            id="gallery-title"
            className="h2"
            lines={[
              'Um espaço pensado',
              <>
                para <em>desacelerar.</em>
              </>,
            ]}
          />
          <ScrollReveal delay={0.1}>
            <p className="body-copy">
              Luz natural, materiais serenos e tecnologia discreta. Imagens ilustrativas, que não retratam o
              espaço de uma clínica real.
            </p>
          </ScrollReveal>
        </header>

        <ul className="gallery__grid">
          {gallery.map((image, i) => (
            <li key={image.src} className={`gallery__item gallery__item--${i + 1}`}>
              <Parallax offset={depths[i]}>
                <figure>
                  <ImageReveal className="gallery__image" src={image.src} alt={image.alt} parallax={4} />
                  <figcaption className="caption">
                    <span className="index-number">0{i + 1}</span> {image.caption}
                  </figcaption>
                </figure>
              </Parallax>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
