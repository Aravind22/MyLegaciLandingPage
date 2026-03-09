'use client';

import { motion } from 'framer-motion';
import styles from './Founder.module.css';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Founder() {
  return (
    <section id="founder" className={styles.section}>
      <div className={styles.inner}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          The Founder
        </motion.span>

        <div className={styles.layout}>
          {/* Text */}
          <motion.div
            className={styles.textCol}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className={styles.headline}>
              Built by someone who watched a family scramble for documents at the worst possible time.
            </h2>
            <div className={styles.body}>
              <p>
                Three years ago, my father was rushed to the hospital with a sudden elevated heart rate — a tachycardia episode. He was fine. But what followed was a different kind of emergency. We needed his health insurance policy. Nobody knew where it was. My mother looked in three different WhatsApp groups, two email accounts, a drawer full of papers, and still couldn&apos;t find it. We eventually paid out of pocket.
              </p>
              <p>
                That experience changed how I think about what it means to be prepared. We build wealth, we build careers, we build families — and then we leave the most important paperwork in a WhatsApp chat called &quot;Family Important.&quot; It is not a laziness problem. It is a tools problem. The tools we use are not designed for this.
              </p>
              <p>
                Legaci is built specifically for the Indian family — Aadhaar, PAN, property documents, insurance policies, wills, medical records. Built with the assumption that your family might need access to this information on the worst day of their lives. Built to be so simple that your parents will actually use it. And built to be so secure that you can trust it with documents that matter.
              </p>
            </div>
            <div className={styles.nameRow}>
              <span className={styles.name}>Founder, Legaci</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
