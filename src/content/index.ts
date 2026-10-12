/**
 * Page content (Brazilian Portuguese). Treatments and the care journey are
 * demonstration categories — no outcome promises or clinical claims.
 * Images are stills graded from the supplied stock footage (see README).
 */
// BASE_URL keeps paths working when the site is served from a sub-folder (GitHub Pages).
const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;

export type Treatment = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const treatments: Treatment[] = [
  {
    id: 'clinica',
    title: 'Dermatologia clínica',
    description:
      'Avaliação e acompanhamento de condições da pele, dos cabelos e das unhas, com diagnóstico cuidadoso e orientação clara.',
    image: media('clinical.webp'),
    alt: 'Profissional de luvas realiza a limpeza do rosto de uma paciente deitada na maca.',
  },
  {
    id: 'saude-da-pele',
    title: 'Saúde e qualidade da pele',
    description:
      'Rotina, proteção e prevenção ajustadas ao seu momento, para cuidar da pele de forma consistente ao longo do tempo.',
    image: media('skin-quality.webp'),
    alt: 'Retrato aproximado de uma mulher de pele negra, com luz suave realçando a textura natural da pele.',
  },
  {
    id: 'estetica',
    title: 'Dermatologia estética',
    description:
      'Procedimentos indicados somente após avaliação individual, com foco em naturalidade e respeito às suas características.',
    image: media('aesthetic.webp'),
    alt: 'Mulher sorrindo de leve, com o rosto iluminado pela luz natural de uma janela.',
  },
  {
    id: 'tecnologias',
    title: 'Tecnologias dermatológicas',
    description:
      'Recursos tecnológicos usados quando há indicação clínica, sempre com explicação sobre etapas, cuidados e limites.',
    image: media('technology.webp'),
    alt: 'Paciente deitada em sala clara, ao lado de um equipamento dermatológico, durante um atendimento.',
  },
  {
    id: 'planejamento',
    title: 'Planejamento individualizado',
    description:
      'Um plano de cuidados construído em conjunto, com prioridades, etapas e retornos definidos em consulta.',
    image: media('planning.webp'),
    alt: 'Mãos ajustando com delicadeza um arranjo de folhas secas em tons neutros.',
  },
];

export type CareStep = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const careSteps: CareStep[] = [
  {
    title: 'Escuta e avaliação individual',
    description:
      'Tudo começa por uma conversa sem pressa: seu histórico, sua rotina, o que incomoda e o que você espera do cuidado com a pele.',
    image: media('aesthetic.webp'),
    alt: 'Retrato de uma mulher tranquila sob a luz natural.',
  },
  {
    title: 'Análise das necessidades da pele',
    description:
      'A avaliação dermatológica observa a pele em detalhe para entender o que ela precisa agora — e o que pode esperar.',
    image: media('skin-texture.webp'),
    alt: 'Detalhe da pele do rosto, com sardas e textura natural sob luz suave.',
  },
  {
    title: 'Planejamento de cuidados',
    description:
      'As recomendações são organizadas em etapas claras, com prioridades, cuidados em casa e a explicação de cada escolha.',
    image: media('planning.webp'),
    alt: 'Mãos compondo um arranjo de folhas secas, com cuidado e precisão.',
  },
  {
    title: 'Acompanhamento profissional',
    description:
      'Retornos programados permitem observar a evolução, ajustar o plano e manter um cuidado próximo e contínuo.',
    image: media('botanical.webp'),
    alt: 'Arranjo de folhas e flores secas em um vaso de cerâmica, contra parede em tom areia.',
  },
];

export type GalleryImage = { src: string; alt: string; caption: string };

export const gallery: GalleryImage[] = [
  {
    src: media('room-wide.webp'),
    alt: 'Sala de atendimento ampla e iluminada, com maca e equipamento dermatológico.',
    caption: 'Luz natural',
  },
  {
    src: media('botanical-detail.webp'),
    alt: 'Detalhe de flores secas em tons de areia e creme.',
    caption: 'Detalhes',
  },
  {
    src: media('equipment.webp'),
    alt: 'Equipamento dermatológico em sala clara, com cortina em tom azul profundo.',
    caption: 'Tecnologia',
  },
  {
    src: media('skin-texture.webp'),
    alt: 'Close do rosto de uma mulher iluminado pelo sol, com a textura natural da pele.',
    caption: 'Textura',
  },
  {
    src: media('botanical.webp'),
    alt: 'Vaso de cerâmica com arranjo de folhas secas sobre fundo neutro.',
    caption: 'Serenidade',
  },
];

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: 'Como funciona a primeira consulta?',
    answer:
      'A primeira consulta é dedicada a conhecer você: histórico, rotina, preocupações e expectativas. Após a avaliação, a dermatologista explica o que observou e quais caminhos podem ser considerados — sem compromisso com nenhum procedimento.',
  },
  {
    question: 'Como posso solicitar um agendamento?',
    answer:
      'Pelo formulário desta página, que organiza sua mensagem para o WhatsApp, ou diretamente pelo WhatsApp e pelo telefone. A equipe responde com as datas e os horários disponíveis.',
  },
  {
    question: 'Quais informações devo levar à consulta?',
    answer:
      'Um documento com foto, a lista de medicamentos e produtos que você usa na pele e exames ou laudos anteriores, se tiver. Sempre que possível, venha sem maquiagem na região que será avaliada.',
  },
  {
    question: 'Como funciona o planejamento dos cuidados?',
    answer:
      'As recomendações são organizadas em etapas, com prioridades, cuidados em casa e retornos. Cada indicação depende da avaliação individual e é explicada antes de qualquer decisão.',
  },
  {
    question: 'Onde fica a clínica?',
    answer:
      'Na Rua Aleixo Netto, 1120, Praia do Canto, em Vitória (ES). O atendimento é feito com hora marcada, de segunda a sexta, das 9h às 19h, e aos sábados, das 9h às 13h.',
  },
];

export const heroMedia = {
  poster: media('hero-poster.webp'),
  posterSmall: media('hero-poster-sm.webp'),
  video: media('hero-1080.mp4'),
  videoSmall: media('hero-720.mp4'),
};

export const editorialMedia = {
  video: media('skin.mp4'),
  poster: media('skin-poster.webp'),
  detail: media('skin-texture.webp'),
};

export const ctaMedia = {
  video: media('botanical.mp4'),
  poster: media('botanical-wide.webp'),
};

export const statementImage = media('botanical.webp');
export const doctorImage = media('doctor.webp');
