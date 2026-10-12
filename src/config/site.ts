/**
 * Central business configuration.
 *
 * Every value below is FICTIONAL demonstration data for the ÉLORA demo.
 * To adapt this site for a real client, replace the values here — all
 * components read contact details, links and hours from this file.
 */
export const site = {
  brand: 'ÉLORA',
  brandSuffix: 'Dermatologia',
  tagline: 'Ciência para a sua pele. Arte em cada detalhe.',
  doctor: {
    name: 'Dra. Helena Vasconcelos',
    specialty: 'Dermatologia e dermatologia estética',
  },
  address: {
    street: 'Rua Aleixo Netto, 1120',
    district: 'Praia do Canto',
    city: 'Vitória',
    state: 'ES',
  },
  phone: {
    display: '+55 (27) 99999-4821',
    href: 'tel:+5527999994821',
  },
  whatsapp: {
    /** Digits only: country code + area code + number. */
    number: '5527999994821',
    display: '+55 (27) 99999-4821',
    defaultMessage: 'Olá! Gostaria de informações sobre uma consulta.',
  },
  email: 'contato@eloradermatologia.example',
  instagram: '@eloradermatologia',
  hours: [
    { days: 'Segunda a sexta', time: '9h às 19h' },
    { days: 'Sábado', time: '9h às 13h' },
  ],
  appointmentModel: 'Atendimento com hora marcada',
  demoNotice: 'Projeto demonstrativo. Marca, profissional e informações fictícias.',
  studio: { name: 'PontoWeb' },
} as const;

export const whatsappUrl = (message: string = site.whatsapp.defaultMessage) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city}, ${site.address.state}`;

export const navigation = [
  { label: 'A clínica', href: '#clinica' },
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'A abordagem', href: '#abordagem' },
  { label: 'Contato', href: '#contato' },
] as const;

/** Anchor of the appointment form; every "schedule" CTA points here. */
export const APPOINTMENT_ANCHOR = '#agendar';
