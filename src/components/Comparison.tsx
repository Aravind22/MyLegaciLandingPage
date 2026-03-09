'use client';

import { motion } from 'framer-motion';
import styles from './Comparison.module.css';

const features = [
  'End-to-end encrypted',
  'Built for families',
  'Expiry alerts',
  'Permission per document',
  'Legacy passing',
  'Zero-knowledge',
];

type CellValue = '✅' | '❌' | 'phase2' | string;

const data: Record<string, CellValue[]> = {
  WhatsApp:      ['❌', '❌', '❌', '❌', '❌', '❌'],
  'Google Drive':['❌', '❌', '❌', 'Partial', '❌', '❌'],
  DigiLocker:    ['✅', '❌', '❌', '❌', '❌', '❌'],
  Legaci:        ['✅', '✅', '✅', '✅', 'phase2', '✅'],
};

const columns = Object.keys(data);

const ease = [0.16, 1, 0.3, 1] as const;

function Cell({ value }: { value: CellValue }) {
  if (value === 'phase2') {
    return (
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <span className={styles.yes}>✅</span>
        <span style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.07em',
          padding: '2px 8px',
          borderRadius: '999px',
          background: 'rgba(201,168,76,0.1)',
          color: '#C9A84C',
          border: '1px solid rgba(201,168,76,0.25)',
          whiteSpace: 'nowrap',
        }}>Phase 2</span>
      </span>
    );
  }
  if (value === '✅') return <span className={styles.yes}>{value}</span>;
  if (value === '❌') return <span className={styles.no}>{value}</span>;
  return <span className={styles.partial}>{value}</span>;
}

export default function Comparison() {
  return (
    <section id="comparison" className={styles.section}>
      <div className={styles.inner}>
        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          Not all storage is equal.
        </motion.h2>

        <motion.div
          className={styles.tableWrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.15, duration: 0.7, ease }}
        >
          <div className={styles.scrollable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.featureCol}>Feature</th>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className={`${styles.colHeader} ${col === 'Legaci' ? styles.legaciHeader : ''}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feat, i) => (
                  <tr key={feat} className={i % 2 === 0 ? styles.rowAlt : styles.rowPlain}>
                    <td className={styles.featureCell}>{feat}</td>
                    {columns.map((col) => (
                      <td
                        key={col}
                        className={`${styles.dataCell} ${col === 'Legaci' ? styles.legaciCell : ''}`}
                      >
                        <Cell value={data[col][i]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.footnote}>
            * WhatsApp encrypts messages in transit but documents are stored in unencrypted cloud backups by default.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
