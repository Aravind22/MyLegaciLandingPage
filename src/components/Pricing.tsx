'use client';

import { motion } from 'framer-motion';
import styles from './Pricing.module.css';

const plans = [
  {
    name: 'FREE',
    price: '₹0',
    priceNote: 'forever',
    badge: null,
    highlight: false,
    features: [
      '1 user account',
      'Up to 25 documents',
      'Basic folder organisation',
      '2 expiry alerts',
      'Email support',
    ],
    cta: 'Get Started Free',
    ctaHref: '#waitlist',
  },
  {
    name: 'FAMILY',
    price: '₹999',
    priceNote: 'per year',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 5 family members',
      'Unlimited documents',
      'Smart auto-organisation',
      'Unlimited expiry alerts',
      'Permission per document',
      'Priority support',
    ],
    cta: 'Join Waitlist',
    ctaHref: '#waitlist',
  },
  {
    name: 'LEGACY',
    price: '₹2,999',
    priceNote: 'per year',
    badge: null,
    highlight: false,
    features: [
      'Everything in Family',
      'Up to 15 family members',
      'Legacy passing (Phase 2)',
      'Will document templates',
      'Lawyer network access',
      'White-glove onboarding',
    ],
    cta: 'Join Waitlist',
    ctaHref: '#waitlist',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Pricing() {
  const handleCta = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.inner}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          Simple Pricing
        </motion.span>

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          Start free. Upgrade when you&apos;re ready.
        </motion.h2>

        <div className={styles.cards}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`${styles.card} ${plan.highlight ? styles.cardHighlight : ''}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease }}
            >
              {plan.badge && (
                <div className={styles.badge}>{plan.badge}</div>
              )}

              <div className={styles.planName}>{plan.name}</div>

              <div className={styles.priceRow}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.priceNote}>{plan.priceNote}</span>
              </div>

              <ul className={styles.featureList}>
                {plan.features.map((feat) => (
                  <li key={feat} className={styles.featureItem}>
                    <span className={styles.check}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                className={`${styles.ctaBtn} ${plan.highlight ? styles.ctaBtnHighlight : ''}`}
                onClick={() => handleCta(plan.ctaHref)}
                data-hover
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
