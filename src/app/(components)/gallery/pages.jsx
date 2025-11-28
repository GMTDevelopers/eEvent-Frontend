// components/ImageGallery.jsx (with lightbox)
'use client';
import Masonry from 'react-masonry-css'
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styles from './gallery.module.css';

export default function ImageGallery({ images = [] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images.length) return <p className={styles.empty}>No images.</p>;

  return (
    <>
      <div className={styles.gallery}>
        {images.map((img, i) => {
          const src = typeof img === 'string' ? img : img.src;

          return (
            <div
              key={i}
              className={`${styles.item} ${styles[`item${i + 1}`]}`}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              style={{ cursor: 'zoom-in' }}
            >
              <img src={src} alt="gallery" className={styles.img} loading="lazy" />
            </div>
          );
        })}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map(img => ({
          src: typeof img === 'string' ? img : img.src,
        }))}
      />
    </>
  );
}