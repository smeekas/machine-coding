import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type ModalProps = {
  open: boolean;
  modalContent: React.ReactNode;
  title?: string;
  onClose: () => void;
};
function Modal({ open, modalContent, onClose, title }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeHandler = useCallback(() => {
    onClose();
  }, []);
  useEffect(() => {
    setIsOpen(open);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    };
    if (open) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeHandler, open]);

  if (!isOpen) return null;
  return (
    <>
      {createPortal(
        <div
          id="modal"
          role="dialog"
          aria-modal
          aria-label={title}
          className={styles.modal}
        >
          <div className={styles.header}>
            <h2>{title}</h2> <button onClick={closeHandler}>X</button>
          </div>
          {modalContent}
        </div>,
        document.body
      )}
      {createPortal(
        <div id="overlay" className={styles.overlay} onClick={closeHandler} />,
        document.body
      )}
    </>
  );
}

export default Modal;
