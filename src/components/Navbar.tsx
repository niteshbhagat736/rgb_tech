'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/process' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Stack', href: '/#stack' },
  { label: 'About', href: '/#stats' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="RGB Tech Logo"
            width={32}
            height={32}
            style={{ borderRadius: '8px', objectFit: 'contain' }}
            priority
          />
          RGB<span className={styles.logoAccent}>Tech</span>
        </Link>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className={styles.ctaBtn} onClick={() => setMenuOpen(false)}>
              Let&apos;s Talk
            </Link>
          </li>
        </ul>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.burgerLineOpen : styles.burgerLine} />
          <span className={menuOpen ? styles.burgerLineMidOpen : styles.burgerLine} />
          <span className={menuOpen ? styles.burgerLineOpen : styles.burgerLine} />
        </button>
      </div>
    </nav>
  );
}
