import Hero from '../components/Hero';
import WorkSection from '../components/WorkSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <div>
      <Hero />
      <WorkSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}