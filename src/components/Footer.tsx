import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const footerLinks = {
  Services: [
    { name: 'Website Development', href: '/#services' },
    { name: 'Software Development', href: '/#services' },
    { name: 'Mobile Apps', href: '/#services' },
    { name: 'AI Solutions', href: '/#services' }
  ],
  Process: [
    { name: 'Discovery & Proposal', href: '/process' },
    { name: 'UI/UX Planning', href: '/process' },
    { name: 'Development', href: '/process' },
    { name: 'Testing & Launch', href: '/process' }
  ],
  Company: [
    { name: 'About Us', href: '/#stats' },
    { name: 'Our Team', href: '/#stats' },
    { name: 'Case Studies', href: '/#testimonials' },
    { name: 'Blog', href: '#' }
  ],
  Contact: [
    { name: 'contact@rgbtechagency.com', href: 'mailto:contact@rgbtechagency.com' },
    { name: '+91 96783 30237', href: 'tel:+919678330237' },
    { name: 'Lokhara Chariali, NH 27, Lokhra Rd, Lokhra, Guwahati, Assam 781040', href: '#' },
    { name: 'Mon–Sat, 9am–7pm', href: '#' }
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} />
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image
                src="/logo.png"
                alt="RGB Tech Logo"
                width={30}
                height={30}
                style={{ borderRadius: '8px', objectFit: 'contain' }}
              />
              RGB<span className={styles.logoAccent}>Tech</span>
            </div>
            <p className={styles.tagline}>
              We build digital products that transform businesses — websites, mobile apps,
              software, and AI solutions, all under one roof.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-dim)', marginTop: '8px', lineHeight: 1.4 }}>
              RGB Tech is a specialized unit of <strong>RGB Graphics Design and Solution</strong>.
            </p>
            <div className={styles.socials}>
              {['LinkedIn', 'Twitter', 'Instagram', 'GitHub'].map((s) => (
                <a key={s} href="#" className={styles.social} aria-label={s}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            {Object.entries(footerLinks).map(([category, items]) => (
              <div key={category} className={styles.linkGroup}>
                <h4 className={styles.linkGroupTitle}>{category}</h4>
                <ul>
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className={styles.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} RGB Tech. A brand under <strong>RGB Graphics Design and Solution</strong>. All rights reserved.
          </span>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Terms of Service</Link>
            <Link href="/sitemap.xml" className={styles.link}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
