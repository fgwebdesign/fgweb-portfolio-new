import dynamic from 'next/dynamic';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';

const Services = dynamic(() =>
  import('@/components/services').then((m) => ({ default: m.Services })),
);
const Process = dynamic(() =>
  import('@/components/process').then((m) => ({ default: m.Process })),
);
const Portfolio = dynamic(() =>
  import('@/components/portfolio').then((m) => ({ default: m.Portfolio })),
);
const Products = dynamic(() =>
  import('@/components/products').then((m) => ({ default: m.Products })),
);
const About = dynamic(() =>
  import('@/components/about').then((m) => ({ default: m.About })),
);
const Skills = dynamic(() =>
  import('@/components/skills').then((m) => ({ default: m.Skills })),
);
const Experience = dynamic(() =>
  import('@/components/experience').then((m) => ({ default: m.Experience })),
);
const Contact = dynamic(() =>
  import('@/components/contact').then((m) => ({ default: m.Contact })),
);
const Footer = dynamic(() =>
  import('@/components/footer').then((m) => ({ default: m.Footer })),
);

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Portfolio />
      <Products />
      <About />
      <Skills />
      <Experience />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
