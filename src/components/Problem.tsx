'use client';

import { motion } from 'framer-motion';
import styles from './Problem.module.css';

const cards = [
  {
    emoji: '📁',
    headline: "It's in a WhatsApp chat. Somewhere.",
    body: "Insurance policies. Property documents. Medical records. Scattered across chats, emails, and folders nobody can find in a crisis.",
  },
  {
    emoji: '🔓',
    headline: "Google Drive isn't built for this.",
    body: "Your Aadhaar, your passport, your property deed — sitting unencrypted on a server Google can read. Shared with whoever has the link.",
  },
  {
    emoji: '💔',
    headline: "When it matters most, chaos takes over.",
    body: "Medical emergencies. Legal disputes. A sudden loss. These are the moments document chaos becomes a family's worst nightmare.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.inner}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          The Problem
        </motion.span>

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          We spend our whole lives building. We spend almost none of it making sure it&apos;s findable.
        </motion.h2>

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
              <span className={styles.emoji}>{card.emoji}</span>
              <h3 className={styles.cardHeadline}>{card.headline}</h3>
              <p className={styles.cardBody}>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
