// app/components/ModalProvider.jsx
"use client";

import { createContext, useContext, useState } from "react";
import styles from "./ModalProvider.module.css";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    document.body.style.overflow = "hidden"; // prevent background scroll
  };

  const closeModal = () => {
    setModalContent(null);
    document.body.style.overflow = "";
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* The actual modal + pink overlay */}
      {modalContent && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.backdrop} />
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeModal}>
              ×
            </button>
            <div className={styles.content}>{modalContent}</div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);