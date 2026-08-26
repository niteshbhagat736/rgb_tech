'use client';

import { useEffect, useRef } from 'react';
import { User, Briefcase, ChefHat, UserCog, HardHat } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: `RGB Tech completely transformed our hospital's patient management. The system is intuitive, fast, and our staff adopted it within a week.`,
    name: 'Dr. Ramesh Patel',
    role: 'Director, City Health Clinic',
    avatar: <User size={24} />,
    stars: 5,
  },
  {
    quote: `Our e-commerce sales doubled after the new website. The team understood exactly what our customers needed and delivered it flawlessly.`,
    name: 'Priya Sharma',
    role: 'Founder, ShopNest India',
    avatar: <Briefcase size={24} />,
    stars: 5,
  },
  {
    quote: `The mobile app they built for our restaurant works perfectly on both Android and iOS. Delivery orders are up 60% since launch.`,
    name: 'Aakash Mehta',
    role: 'CEO, QuickBites',
    avatar: <ChefHat size={24} />,
    stars: 5,
  },
  {
    quote: `Their AI chatbot handles over 200 customer queries daily without any human intervention. It has saved us thousands in support costs.`,
    name: 'Sarah Johnson',
    role: 'Operations Head, TechServ UK',
    avatar: <UserCog size={24} />,
    stars: 5,
  },
  {
    quote: `Phase-by-phase development with constant reviews meant zero surprises. I always knew exactly where my project stood.`,
    name: 'Vikram Nair',
    role: 'MD, BuildRight Construction',
    avatar: <HardHat size={24} />,
    stars: 5,
  },
];

export default function Testimonials() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((c) => { if (c) observer.observe(c); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <div className={`reveal ${styles.header}`}>
          <span className="section-label">Client Stories</span>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle">
            Real outcomes from real businesses — here is what our clients say
            about working with us.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`reveal delay-${(i % 3) + 1} ${styles.card} ${i === 0 ? styles.featured : ''}`}
              id={`testimonial-${i}`}
            >
              <div className={styles.stars}>
                {'★'.repeat(t.stars)}
              </div>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.author}>
                <span className={styles.avatar}>{t.avatar}</span>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
