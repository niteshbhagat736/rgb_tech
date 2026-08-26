import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, ArrowLeft, Lock, FileText, Globe, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | RGB Tech',
  description: 'Privacy Policy for RGB Tech, a specialized software and digital transformation brand operating under RGB Graphics Design and Solution.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
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
              <Shield size={16} /> Legal & Privacy
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '12px' }}>
              Privacy Policy
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
              <FileText size={20} color="#818cf8" /> Brand Ownership & Corporate Identity
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
              <strong>RGB Tech</strong> is a specialized software development, digital transformation, and web technology brand operated and owned under <strong>RGB Graphics Design and Solution</strong>. All agreements, digital services, software products, and consulting engagements provided under the RGB Tech brand name are backed and governed by <strong>RGB Graphics Design and Solution</strong>.
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
                1. Information We Collect
              </h2>
              <p style={{ marginBottom: '12px' }}>
                When you visit our website, request a consultation, or partner with us for software engineering, we may collect:
              </p>
              <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Contact Information:</strong> Name, business email address, phone number, and organization name submitted through our inquiry forms.</li>
                <li><strong>Project Specifications:</strong> Technical requirements, project briefs, architectural preferences, and design assets shared for development.</li>
                <li><strong>Usage & Analytics:</strong> Anonymous technical telemetry including device type, browser metadata, and site navigation patterns to optimize user experience.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                2. How We Use Your Information
              </h2>
              <p style={{ marginBottom: '12px' }}>
                The information collected by <strong>RGB Tech</strong> (RGB Graphics Design and Solution) is strictly utilized to:
              </p>
              <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Provide software engineering, custom web applications, mobile applications, and AI solution consulting.</li>
                <li>Communicate project milestones, technical deliverables, architectural proposals, and client support.</li>
                <li>Maintain enterprise security, prevent unauthorized access, and fulfill contractual commitments.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                3. Confidentiality & Non-Disclosure
              </h2>
              <p>
                We treat all proprietary source code, intellectual property, product designs, and customer databases with rigorous confidentiality. <strong>RGB Graphics Design and Solution</strong> and <strong>RGB Tech</strong> enforce strict Non-Disclosure Agreements (NDAs) and role-based access control across all engineering teams.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                4. Data Protection & Security
              </h2>
              <p>
                We deploy industry-standard TLS encryption, authenticated cloud infrastructure, and enterprise role-based security to ensure your data remains protected from unauthorized disclosure or alteration.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                5. Third-Party Services
              </h2>
              <p>
                We may utilize trusted third-party providers (such as Resend for transactional inquiry routing, Clerk for secured team authentication, and MongoDB Atlas for project indexing). These providers only process data in compliance with enterprise privacy standards.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                6. Contact & Legal Inquiries
              </h2>
              <p style={{ marginBottom: '12px' }}>
                If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our legal and privacy desk:
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
                <div><strong>Entity:</strong> RGB Tech (A brand under RGB Graphics Design and Solution)</div>
                <div><strong>Email:</strong> <a href="mailto:tech@fasterkart.com" style={{ color: '#818cf8', textDecoration: 'none' }}>tech@fasterkart.com</a></div>
                <div><strong>Phone:</strong> +91 96783 30237</div>
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
