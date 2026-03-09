'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleWaitlistClick = () => {
    const el = document.querySelector('#waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="hero" className={styles.hero}>
      {/* Animated gradient mesh background */}
      <div className={styles.meshBg} aria-hidden="true" />
      {/* Grid overlay */}
      <div className={styles.gridOverlay} aria-hidden="true" />
      {/* Noise filter */}
      <svg className={styles.noiseSvg} aria-hidden="true">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03" />
      </svg>

      <div className={styles.content}>
        {/* Badge */}
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease }}
        >
          🔐 End-to-End Encrypted &nbsp;•&nbsp; Zero Knowledge Architecture
        </motion.div>

        {/* Headline */}
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease }}
        >
          Your family has no idea
        </motion.h1>
        <motion.h1
          className={`${styles.headline} gold-text`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease }}
        >
          where your most important
        </motion.h1>
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7, ease }}
        >
          documents are.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className={styles.subheadline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease }}
        >
          Legaci is a secure family vault for Indian families. Everything in one place.
          Encrypted. Always accessible. Even when you&apos;re not.
        </motion.p>

        {/* CTA */}
        <motion.button
          className={styles.ctaBtn}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease }}
          onClick={handleWaitlistClick}
          data-hover
          whileHover={{ scale: 1.02 }}
        >
          Join the Waitlist — Free Forever Tier
        </motion.button>

        {/* Helper text */}
        <motion.p
          className={styles.helperText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.7, ease }}
        >
          No credit card. No commitment. Early access when we launch.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 10 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} color="var(--accent-gold)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
