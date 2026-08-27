'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const words = ['Websites', 'Mobile Apps', 'AI Solutions', 'Software'];

export default function Hero() {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let idx = 0;
    const el = wordRef.current;
    if (!el) return;

    const cycle = () => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px) rotateX(-90deg)';
      setTimeout(() => {
        idx = (idx + 1) % words.length;
        el.textContent = words[idx];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) rotateX(0deg)';
      }, 400);
    };

    const interval = setInterval(cycle, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Ambient blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Trusted Digital Partner
        </div>

        <h1 className={styles.heading}>
          We Build{' '}
          <span className={styles.cycleWrapper}>
            <span ref={wordRef} className={styles.cycleWord}>
              {words[0]}
            </span>
          </span>
          <br />
          That <span className="gradient-text">Transforms</span> Your Business
        </h1>

        <p className={styles.subtext}>
          From idea to launch — we design, develop, and deliver{' '}
          <strong>scalable digital products</strong> for startups, enterprises,
          and everything in between.
        </p>

        <div className={styles.actions}>
          <Link href="/#services" className={styles.primaryBtn} id="hero-explore-btn">
            Explore Services
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/process" className={styles.secondaryBtn} id="hero-process-btn">
            Our Process
          </Link>
        </div>

        <div className={styles.stats}>
          {[
            { value: '90+', label: 'Projects Delivered' },
            { value: '80+', label: 'Happy Clients' },
            { value: '3+', label: 'Years Experience' },
          ].map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span />
      </div>
    </section>
  );
}
