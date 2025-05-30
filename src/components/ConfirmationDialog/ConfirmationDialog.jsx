import React, { useEffect, useRef } from "react";
import styles from "./ConfirmationDialog.module.css";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, triggerRef }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      dialogRef.current?.focus();
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} data-testid="overlay">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={dialogRef}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title">Confirm Deletion</h2>
        <p id="dialog-description">
          Are you sure you want to delete this post?
        </p>
        <div className={styles.buttons}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
