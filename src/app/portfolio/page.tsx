import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink } from 'lucide-react';
import styles from './page.module.css';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { defaultProjects, PortfolioProject } from '@/lib/defaultProjects';

export const metadata: Metadata = {
  title: 'Our Portfolio | Case Studies & Client Projects | RGB Tech',
  description: 'Explore RGB Tech\'s successful software projects and case studies, including custom enterprise ERPs, high-converting e-commerce sites, food delivery networks, and advanced AI-powered tools.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Client Work & Portfolio | RGB Tech',
    description: 'Explore our latest software products, web applications, and digital systems built for global clients by RGB Tech (RGB Graphics Design and Solution).',
    url: '/portfolio',
    type: 'website',
  },
};

async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const dbProjects = await Project.find({ isLive: { $ne: false } }).sort({ order: 1, createdAt: -1 }).lean();
      if (dbProjects && dbProjects.length > 0) {
        return JSON.parse(JSON.stringify(dbProjects));
      }
    }
  } catch (error) {
    console.error('Error fetching live portfolio from MongoDB:', error);
  }
  return defaultProjects.filter((p) => p.isLive !== false);
}

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <main>
      <Navbar />
      
      <div className={styles.page}>
        <div className={styles.bgGlow} />
        
        <div className="container">
          <div className={`reveal ${styles.header}`}>
            <span className="section-label">Our Work</span>
            <h1 className="section-title">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className={styles.subtitle}>
              A selection of our recent projects. We build scalable, high-performance 
              software that solves real business problems.
            </p>
          </div>

          <div className={styles.grid}>
            {projects.map((project, i) => (
              <a 
                key={project._id || project.id || project.title} 
                href={project.link || '#'} 
                className={`reveal delay-${(i % 3) + 1} ${styles.card}`}
                target={project.link && project.link !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                  />
                </div>
                <div className={styles.content}>
                  <span className={styles.category}>{project.category}</span>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  
                  <div className={styles.footer}>
                    View Project
                    <ExternalLink size={16} className={styles.icon} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
