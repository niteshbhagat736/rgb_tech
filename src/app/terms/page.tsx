import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Scale, ArrowLeft, FileCheck, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | RGB Tech',
  description: 'Terms of Service governing engineering and digital services provided by RGB Tech, a unit of RGB Graphics Design and Solution.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  const lastUpdated = 'August 26, 2026';

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <Link 
              href="/" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-text-dim)',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '6px 14px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s ease',
              }}
            >
              <ArrowLeft size={15} /> Back to Home
            </Link>
          </div>

          <header style={{ marginBottom: '40px', textAlign: 'left' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '100px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#818cf8',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '16px',
            }}>
              <Scale size={16} /> Legal & Terms
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '12px' }}>
              Terms of Service
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
              Last Updated: {lastUpdated}
            </p>
          </header>

          {/* Legal Identity Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.08))',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '40px',
          }}>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileCheck size={20} color="#818cf8" /> Governance & Parent Entity
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
              The software engineering, website development, mobile application development, and AI consulting services rendered under the brand name <strong>RGB Tech</strong> are executed and legally represented by <strong>RGB Graphics Design and Solution</strong>.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '20px',
            padding: '36px',
            color: '#cbd5e1',
            lineHeight: 1.7,
            fontSize: '15px',
          }}>
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                1. Scope of Services
              </h2>
              <p>
                <strong>RGB Tech</strong> offers customized digital engineering solutions including web development, cloud software architectures, mobile apps, database integrations, and automated AI tools. Specific deliverables, delivery milestones, and costs are formalized through Statements of Work (SOW) executed with <strong>RGB Graphics Design and Solution</strong>.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                2. Intellectual Property Rights
              </h2>
              <p>
                Upon receipt of full payment according to the agreed project milestone schedule, all custom deliverables, project source code, graphical assets, and technical documentation produced exclusively for the client shall become the client's sole intellectual property.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                3. Warranties & Code Quality
              </h2>
              <p>
                We build modern digital products adhering to high standards of clean code, security best practices, and performance optimization. We provide post-deployment support and warranty periods as specified in client project agreements.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                4. Contact Information
              </h2>
              <p style={{ marginBottom: '12px' }}>
                For contractual agreements, vendor onboarding, or formal notices:
              </p>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '14px',
              }}>
                <div><strong>Business Entity:</strong> RGB Tech (RGB Graphics Design and Solution)</div>
                <div><strong>Email:</strong> <a href="mailto:tech@fasterkart.com" style={{ color: '#818cf8', textDecoration: 'none' }}>tech@fasterkart.com</a></div>
                <div><strong>Location:</strong> Lokhara Chariali, NH 27, Lokhra Rd, Lokhra, Guwahati, Assam 781040</div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
