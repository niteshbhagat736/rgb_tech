'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
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

          {/* Desktop Navigation Links */}
          <ul className={styles.desktopLinks}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contact" className={styles.ctaBtn}>
                Let&apos;s Talk
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger / Close Button in Navbar */}
          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} color="#ffffff" /> : <Menu size={26} color="#ffffff" />}
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.logo}>
            <Image
              src="/logo.png"
              alt="RGB Tech Logo"
              width={28}
              height={28}
              style={{ borderRadius: '6px', objectFit: 'contain' }}
            />
            RGB<span className={styles.logoAccent}>Tech</span>
          </div>
          <button
            type="button"
            className={styles.drawerCloseBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X size={24} color="#ffffff" />
          </button>
        </div>

        <ul className={styles.drawerLinks}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={styles.drawerLink}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                <ArrowRight size={16} className={styles.drawerLinkArrow} />
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.drawerFooter}>
          <Link
            href="/#contact"
            className={styles.drawerCtaBtn}
            onClick={() => setMenuOpen(false)}
          >
            Let&apos;s Talk <ArrowRight size={16} />
          </Link>
          <div className={styles.drawerMeta}>
            <span>tech@fasterkart.com</span>
            <span>+91 96783 30237</span>
          </div>
        </div>
      </div>
    </>
  );
}
