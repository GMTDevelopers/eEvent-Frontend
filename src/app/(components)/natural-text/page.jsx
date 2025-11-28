// components/NaturalDescription.jsx
'use client';

import { useMemo } from 'react';
import styles from './naturalText.module.css';

export default function NaturalDescription({ text }) {
  const paragraphs = useMemo(() => {
    if (!text || !text.trim()) return [];

    return text
      .split(/\n\s*\n/)           // Split on blank lines → new paragraph
      .map(paragraph =>
        paragraph
          .split('\n')            // Split single newlines
          .map(line => line.trim())
          .filter(line => line)   // Remove empty lines
          .join(' ')              // Join with space
      )
      .filter(p => p);           // Remove empty paragraphs
  }, [text]);

  return (
    <div className={styles.description}>
      {paragraphs.map((para, index) => (
        <p key={index} className={styles.paragraph}>
          {para}
        </p>
      ))}
    </div>
  );
}