'use client';

import { motion } from 'framer-motion';
import styles from './Solution.module.css';

const features = [
  {
    icon: '🔐',
    headline: 'Military-Grade Encryption',
    body: 'Your documents are encrypted on your device before they ever leave it. Even we cannot read them. Mathematically guaranteed.',
  },
  {
    icon: '👨‍👩‍👧',
    headline: 'Built for the Whole Family',
    body: 'Invite up to 5 family members. Control exactly who sees what. Your mother sees medical. Your spouse sees everything. Your kids see their own.',
  },
  {
    icon: '⏰',
    headline: 'Never Miss What Matters',
    body: 'Passport expiring in 60 days? Insurance renewal in 2 weeks? Legaci knows. You\'ll know before it\'s too late.',
  },
];

const folders = ['Identity', 'Medical', 'Insurance', 'Financial', 'Property'];
const documents = [
  { name: 'Aadhaar Card.pdf', expiry: null },
  { name: 'Health Policy 2024.pdf', expiry: '18 days' },
  { name: 'Passport_Rahul.pdf', expiry: '127 days' },
];
const members = ['RS', 'PS', 'AS'];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Solution() {
  return (
    <section id="solution" className={styles.section}>
      <div className={styles.inner}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          The Solution
        </motion.span>

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          One vault. Every document. Your whole family. Always safe.
        </motion.h2>

        {/* Vault Mockup */}
        <motion.div
          className={styles.vaultWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.2, duration: 0.7, ease }}
        >
          <div className={styles.vault}>
            {/* Vault Header */}
            <div className={styles.vaultHeader}>
              <div className={styles.vaultTitle}>
                <span className={styles.lockIcon}>🔒</span>
                <span>Family Vault — Sharma Family</span>
              </div>
              <div className={styles.members}>
                {members.map((m) => (
                  <div key={m} className={styles.avatar} title={m}>
                    {m}
                  </div>
                ))}
                <div className={styles.permBadge}>All access</div>
              </div>
            </div>

            {/* Vault Body */}
            <div className={styles.vaultBody}>
              {/* Sidebar */}
              <aside className={styles.sidebar}>
                <div className={styles.sidebarLabel}>Folders</div>
                {folders.map((f, i) => (
                  <div key={f} className={`${styles.folder} ${i === 0 ? styles.folderActive : ''}`}>
                    <span>📂</span> {f}
                  </div>
                ))}
              </aside>

              {/* Main panel */}
              <div className={styles.panel}>
                <div className={styles.panelLabel}>Identity Documents</div>
                {documents.map((doc) => (
                  <div key={doc.name} className={styles.docCard}>
                    <div className={styles.docLeft}>
                      <span className={styles.docIcon}>🔒</span>
                      <span className={styles.docName}>{doc.name}</span>
                    </div>
                    {doc.expiry && <span className={styles.expiryBadge}>Expires in {doc.expiry}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature callouts */}
        <div className={styles.features}>
          {features.map((f, i) => (
            <motion.div
              key={f.headline}
              className={styles.feature}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.15, duration: 0.7, ease }}
            >
              <span className={styles.featureIcon}>{f.icon}</span>
              <h3 className={styles.featureHeadline}>{f.headline}</h3>
              <p className={styles.featureBody}>{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
