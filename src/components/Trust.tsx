'use client';

import { motion } from 'framer-motion';
import styles from './Trust.module.css';

const cards = [
  {
    headline: 'Zero-Knowledge Architecture',
    body: 'Your documents are encrypted using AES-256 before they leave your device. The encryption key is derived from your password using PBKDF2 — a key that only you hold. Our servers receive only ciphertext. Even if we are compromised, your data is mathematically unreadable. We have designed the system so that trust in us is optional.',
    badge: 'View on GitHub →',
    badgeHref: 'https://github.com',
  },
  {
    headline: 'Open Source Encryption Layer',
    body: 'The encryption layer of Legaci is fully open source and available for independent audit. You do not need to take our word for it — you can read the code, verify the implementation, and confirm that we do exactly what we claim. Security through obscurity is not security. We believe in transparency.',
    badge: 'Read the Code →',
    badgeHref: 'https://github.com',
  },
  {
    headline: 'Your Data, Your Exit',
    body: 'You can export every document you have ever uploaded to Legaci at any time, in original format, with zero friction. We do not lock you in. If you decide to leave, we will delete everything from our servers within 30 days — verifiably, with a signed deletion certificate. Your family\'s data belongs to your family.',
    badge: 'Our Data Promise →',
    badgeHref: '#',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Trust() {
  return (
    <section id="trust" className={styles.section}>
      <div className={styles.inner}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          Why Trust Us
        </motion.span>

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          You shouldn&apos;t trust us. Not yet.
        </motion.h2>

        <motion.p
          className={styles.subheadline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.15, duration: 0.7, ease }}
        >
          That&apos;s exactly why we built Legaci so that even we can&apos;t read your documents.
        </motion.p>

        <div className={styles.cards}>
          {cards.map((card, i) => (
            <motion.div
              key={card.headline}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.15, duration: 0.7, ease }}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardHeadline}>{card.headline}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </div>
              <a
                href={card.badgeHref}
                className={styles.cardBadge}
                target={card.badgeHref.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {card.badge}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
