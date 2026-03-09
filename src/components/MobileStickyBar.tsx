'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileStickyBar.module.css';

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('#hero');

    const onScroll = () => {
      if (!hero) {
        setVisible(window.scrollY > 100);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    const el = document.querySelector('#waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.bar}
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className={styles.btn} onClick={handleClick} data-hover>
            Secure My Family&apos;s Documents →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
