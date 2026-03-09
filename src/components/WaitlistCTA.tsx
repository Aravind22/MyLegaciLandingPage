'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WaitlistCTA.module.css';

const ease = [0.16, 1, 0.3, 1] as const;

export default function WaitlistCTA() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className={styles.section}>
      {/* Same animated gradient mesh as hero */}
      <div className={styles.meshBg} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          Your family deserves better than a WhatsApp folder.
        </motion.h2>

        <motion.p
          className={styles.subheadline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          Join the waitlist. Free forever tier available at launch.
        </motion.p>

        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.2, duration: 0.7, ease }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className={styles.successMsg}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                You&apos;re on the list. We&apos;ll be in touch soon. 🔐
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className={`${styles.inputWrapper} ${focused === 'name' ? styles.inputFocused : ''}`}
                >
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={styles.input}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div
                  className={`${styles.inputWrapper} ${focused === 'email' ? styles.inputFocused : ''}`}
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <button type="submit" className={styles.submitBtn} data-hover>
                  Secure My Spot
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className={styles.formNote}>
            No spam. No credit card. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.3, duration: 0.7, ease }}
        >
          <div className={styles.footerMain}>
            mylegaci.in &nbsp;|&nbsp; Built in India &nbsp;|&nbsp; © 2026 Legaci
          </div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink} data-hover>Privacy Policy</a>
            <span className={styles.footerDivider}>·</span>
            <a href="#" className={styles.footerLink} data-hover>Terms of Service</a>
            <span className={styles.footerDivider}>·</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink} data-hover>GitHub</a>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
