import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Industries from '@/components/Industries';
import TechStack from '@/components/TechStack';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'RGB Tech | Digital Transformation & Custom Software Development',
  description: 'Accelerate your digital growth with RGB Tech (a unit of RGB Graphics Design and Solution). We develop custom software, high-performance web applications, mobile apps, and scalable AI solutions tailored to your business needs.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RGB Tech | Custom Software Development Agency',
    description: 'We develop custom software, high-performance web applications, mobile apps, and scalable AI solutions.',
    url: '/',
    siteName: 'RGB Tech',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Industries />
      <TechStack />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
