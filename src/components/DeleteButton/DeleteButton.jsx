import React from "react";
import styles from "./DeleteButton.module.css";

// Forward ref so parent can capture it and restore focus after modal closes
const DeleteButton = React.forwardRef(({ onClick }, ref) => {
  return (
    <button ref={ref} className={styles.deleteButton} onClick={onClick}>
      Delete
    </button>
  );
});

export default DeleteButton;
