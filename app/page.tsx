import BuiltFor from '@/components/BuiltFor';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Process from '@/components/Process';
import SelectedWork from '@/components/SelectedWork';
import Services from '@/components/Services';
import Team from '@/components/Team';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BuiltFor />
      <SelectedWork />
      <Process />
      <Team />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
