import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Phases from '@/components/Phases';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Our Process | How We Build Software | RGB Tech',
  description: 'Discover RGB Tech\'s structured software development lifecycle. From discovery and design to development, testing, deployment, and ongoing optimization under RGB Graphics Design and Solution.',
  alternates: {
    canonical: '/process',
  },
  openGraph: {
    title: 'Our Development Process | RGB Tech',
    description: 'Learn how we build scalable software, web apps, and mobile applications using agile methodologies and modern technology stacks.',
    url: '/process',
    type: 'website',
  },
};

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg-2)' }}>
        <Phases />
      </div>
      <Footer />
    </>
  );
}
