'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;
      lastY = y;
      setScrolled(y > 100);
    };

    const tick = () => {
      const y = lastY;

      // Background-only parallax at 0.1x — text never moves
      if (meshRef.current) {
        meshRef.current.style.transform = `translateY(${y * 0.1}px)`;
      }

      // Fade entire hero text container out between 0px and 300px scroll
      if (contentRef.current) {
        const opacity = Math.max(0, 1 - y / 300);
        contentRef.current.style.opacity = String(opacity);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleWaitlistClick = () => {
    const el = document.querySelector('#waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="hero" className={styles.hero}>
      {/* Animated gradient mesh background — parallax only element */}
      <div ref={meshRef} className={styles.meshBg} aria-hidden="true" />
      {/* Grid overlay */}
      <div className={styles.gridOverlay} aria-hidden="true" />
      {/* Grain overlay */}
      <div className={styles.grainOverlay} aria-hidden="true" />

      {/* Hero text container — fades on scroll, no transform */}
      <div ref={contentRef} className={styles.content}>
        {/* Badge */}
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease }}
        >
          🔐 End-to-End Encrypted &nbsp;•&nbsp; Zero Knowledge Architecture
        </motion.div>

        {/* Headline — completely static, no parallax */}
        <div className={styles.headlineGroup}>
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease }}
          >
            Your family has no idea
          </motion.h1>
          <motion.h1
            className={`${styles.headline} gold-text`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease }}
          >
            where your most important
          </motion.h1>
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease }}
          >
            documents are.
          </motion.h1>
        </div>

        {/* Subheadline — completely static, no parallax */}
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
        <div className={styles.scrollChevron}>
          <ChevronDown size={24} color="var(--accent-gold)" />
        </div>
      </motion.div>
    </section>
  );
}
