'use client';

import { useEffect, useRef, useState } from 'react';
import { Rocket, Handshake, Star, Target, RefreshCw, Zap, ShieldCheck, MessageCircle, Smartphone } from 'lucide-react';
import styles from './Stats.module.css';

const stats = [
  { value: 90, suffix: '+', label: 'Projects Delivered', icon: <Rocket size={24} />, desc: 'Across web, mobile & software' },
  { value: 80, suffix: '+', label: 'Happy Clients', icon: <Handshake size={24} />, desc: 'Businesses transformed globally' },
  { value: 3, suffix: '+', label: 'Years Experience', icon: <Star size={24} />, desc: 'Building digital products' },
];

function AnimatedCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);
    cardRefs.current.forEach((c) => { if (c) observer.observe(c); });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className={styles.section} ref={sectionRef}>
      <div className={styles.bgGlow} />
      <div className="container">
        <div className={`reveal ${styles.header}`}>
          <span className="section-label">By The Numbers</span>
          <h2 className="section-title">
            Proven Results,{' '}
            <span className="gradient-text">Real Benchmark</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`reveal delay-${i + 1} ${styles.card}`}
              id={`stat-card-${i}`}
            >
              <span className={styles.icon}>{stat.icon}</span>
              <div className={styles.number}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} active={active} />
              </div>
              <div className={styles.label}>{stat.label}</div>
              <div className={styles.desc}>{stat.desc}</div>
            </div>
          ))}
        </div>

        <div className={`reveal ${styles.whyUs}`}>
          <h3 className={styles.whyTitle}>Why businesses choose us</h3>
          <div className={styles.reasons}>
            {[
              { icon: <Target size={24} />, title: 'Outcome-Focused', desc: 'We focus on your business goals, not just code delivery' },
              { icon: <RefreshCw size={24} />, title: 'Transparent Process', desc: 'You are involved and informed at every milestone' },
              { icon: <Zap size={24} />, title: 'Agile Delivery', desc: 'Fast iterations with frequent client reviews built in' },
              { icon: <ShieldCheck size={24} />, title: 'Post-Launch Support', desc: 'Bug fixes, updates, and monitoring after go-live' },
              { icon: <MessageCircle size={24} />, title: 'Clear Communication', desc: 'No tech jargon — we explain in plain business language' },
              { icon: <Smartphone size={24} />, title: 'Cross-Platform', desc: 'Web, mobile, and desktop from one unified team' },
            ].map((reason) => (
              <div key={reason.title} className={styles.reason}>
                <span className={styles.reasonIcon}>{reason.icon}</span>
                <div>
                  <div className={styles.reasonTitle}>{reason.title}</div>
                  <div className={styles.reasonDesc}>{reason.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
