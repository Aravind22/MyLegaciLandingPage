'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '01',
    title: 'Create your family vault',
    body: 'One account. Invite your family with a simple link.',
  },
  {
    number: '02',
    title: 'Upload your documents',
    body: 'Drag and drop. We organise them automatically into the right folders.',
  },
  {
    number: '03',
    title: 'Set your expiry alerts',
    body: 'Tell us when documents expire. We\'ll remind you well in advance.',
  },
  {
    number: '04',
    title: 'Your family is protected',
    body: 'Everyone has access to exactly what they need. Nothing more.',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function HowItWorks() {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="how-it-works" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          How It Works
        </motion.span>

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          Set up in minutes. Secure for a lifetime.
        </motion.h2>

        {/* Desktop connecting line */}
        <div className={styles.lineWrapper} aria-hidden="true">
          <svg
            className={styles.lineSvg}
            viewBox="0 0 800 2"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.line
              ref={lineRef}
              x1="0"
              y1="1"
              x2="800"
              y2="1"
              stroke="var(--accent-gold)"
              strokeWidth="1"
              strokeOpacity="0.4"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            />
          </svg>
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={styles.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.15, duration: 0.7, ease }}
            >
              <div className={styles.circle}>
                <span className={styles.number}>{step.number}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
