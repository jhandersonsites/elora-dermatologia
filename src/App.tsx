import { MotionConfig } from 'motion/react';
import { AppointmentCTA } from './components/AppointmentCTA';
import { BrandStatement } from './components/BrandStatement';
import { CareApproach } from './components/CareApproach';
import { ClinicGallery } from './components/ClinicGallery';
import { ContactSection } from './components/ContactSection';
import { DoctorProfile } from './components/DoctorProfile';
import { EditorialStory } from './components/EditorialStory';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PrivacyDialog } from './components/PrivacyDialog';
import { TreatmentShowcase } from './components/TreatmentShowcase';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  return (
    // reducedMotion="user": Motion drops transform animations when the OS asks for less motion.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <BrandStatement />
        <TreatmentShowcase />
        <EditorialStory />
        <CareApproach />
        <DoctorProfile />
        <ClinicGallery />
        <AppointmentCTA />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <PrivacyDialog />
    </MotionConfig>
  );
}
